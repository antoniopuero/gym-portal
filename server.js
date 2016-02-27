import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "./webpack.config";
import nconf from "./config";
import _ from "lodash";
import request from "superagent";
import url from "url";
import path from "path";
import serveStatic from "serve-static";
import uuid from "uuid";
import bodyParser from "body-parser";
import fs from "fs";
import favicon from "serve-favicon";
import loggers from "./loggers";
import errorHandler from "./errorHandler";
import moment from "moment";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
const MongoStore = require("connect-mongo")(session);
import api from "./api/routes";
import auth from "./api/auth";

let app = new require("express")();
mongoose.connect(nconf.get("mongoQueryString"), (err) => {
  if (err) {
    console.log(err);
  }
});

const db = mongoose.connection;

app.whenReadyPromise = new mongoose.Promise();

db.once("open", (callback) => {
  return app.whenReadyPromise.resolve();
});

db.on("error", (err) => {
  return app.whenReadyPromise.reject();
});

const assetsPath = path.join(__dirname, "assets");
const staticPath = path.join(__dirname, "dist");
const publicPath = path.join(__dirname, "static");
const viewsPath = path.join(__dirname, "jade-views");

if (nconf.get("env") === "development") {
  var compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
  app.use(webpackHotMiddleware(compiler));
}

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'this is no longer a secret',
  store: new MongoStore({
    expires: 24 * 60 * 60 * 1000,
    mongooseConnection: db
  })
}));

//app.use(favicon(path.join(__dirname, "assets/locator.png")));
app.use("/assets", serveStatic(assetsPath));
app.use("/static", serveStatic(staticPath));
app.use("/public", serveStatic(publicPath));

app.set("views", viewsPath);
app.set("view engine", "jade");
app.locals.currentYear = moment().year();

app.use("/api", api);
app.use("/auth", auth);

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use(errorHandler);
app.listen(process.env.PORT || nconf.get("port"), (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`Listening on ${nconf.get("host")}:${nconf.get("port")}`);
  }
});

