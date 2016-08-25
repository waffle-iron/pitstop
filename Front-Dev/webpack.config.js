var webpack = require("webpack");
var path = require("path");
 
var DEV = path.join(__dirname, "Dev");
var OUTPUT = path.join(__dirname, "../src/main/webapp/resources/js");

var config = {
  entry: DEV + "/index.jsx",
  output: {
    path: OUTPUT ,
    filename: "pitstop.general.js"
  },
  module: {
    loaders: [{
        include: DEV,
        loader: "babel",
    }]
  }
  
};
 
module.exports = config;