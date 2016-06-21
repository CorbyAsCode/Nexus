// Let's digest some data!
var argv = require('yargs').argv;
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://mongo:27017/facts';

MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
    var collection = db.collection('allFacts');
    // Ready to query!
    countRhel7(collection, 

// Count stuff


// Find things that matter


// Aggregate things


