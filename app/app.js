var express = require('express');
var app = express();
var Url = require('url');
var mongodb = require('mongodb');
var port = process.env.PORT || 8080;
var MongoClient = mongodb.MongoClient;
var routes = require('./routes');

app.use(routes);

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
