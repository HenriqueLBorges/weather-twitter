var express = require("express");
var app = express();
//Loads the enviroment variables if the server isn't in production
console.log("process.env.consumer_key = ", process.env.consumer_key);

//exports app
module.exports = app;