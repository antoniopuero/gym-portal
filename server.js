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
import multer from "multer";
import bodyParser from "body-parser";
import fs from "fs";
import favicon from "serve-favicon";
import loggers from "./loggers";
import errorHandler from "./errorHandler";
import superagent from "superagent";
import moment from "moment";

let app = new require("express")();

const assetsPath = path.join(__dirname, "assets");
const staticPath = path.join(__dirname, "dist");
const publicPath = path.join(__dirname, "static");
const viewsPath = path.join(__dirname, "jade-views");

if (nconf.get("env") === "development") {
  var compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
  app.use(webpackHotMiddleware(compiler));
}

app.use(bodyParser.json());

//app.use(favicon(path.join(__dirname, "assets/locator.png")));
app.use("/assets", serveStatic(assetsPath));
app.use("/static", serveStatic(staticPath));
app.use("/public", serveStatic(publicPath));

app.set("views", viewsPath);
app.set("view engine", "jade");
app.locals.currentYear = moment().year();


app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use(errorHandler);

app.listen(nconf.get("port"), (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`Listening on ${nconf.get("host")}:${nconf.get("port")}`);
  }
});

