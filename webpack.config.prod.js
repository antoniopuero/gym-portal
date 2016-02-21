require("babel-core/register");

var path = require("path");
var webpack = require("webpack");
var nconf = require("./config");

module.exports = {
  entry: [
    "./index"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: [
    new webpack.DefinePlugin({"process.env": JSON.stringify(nconf.get())}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /en-gb/)
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ["babel"],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.less$/,
      loader: "style!css!less"
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.(otf|eot|png|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url?limit=8192"
    }, {
      test: /\.html$/,
      loader: "html"
    }]
  }
};
