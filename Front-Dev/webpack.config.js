var webpack = require("webpack");
var path = require("path");
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
 
var DEV = path.join(__dirname, "Dev");
var OUTPUT = path.join(__dirname, "../src/main/webapp/resources/js");
//var OUTPUT = path.join(__dirname, "output");

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