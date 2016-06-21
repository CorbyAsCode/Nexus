var fs = require('fs');
var mongodb = require('mongodb');

//var inData = 'factsDump.json';
var inData = 'facts_dump.json.orig';
//var inData = 'factsDumpShort.json';
//var outData = {};

function checkNumber(value) {
  if ( value.match(/^\d+(\.)?\d+$/) ){
    return +value;
  } else {
    return value;
  }
}

// Determine if the value is a nested object or not
function stringToObj(string) {
  var value = null;
  try { 
    value = JSON.parse(string);
  } catch (e) {
    value = string;
  }
  return value;
}

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://mongo:27017/facts';
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //We are connected. :)
    console.log('Connection established to', url);
    var collection = db.collection('allFacts');

    fs.readFile(inData, 'utf8', function(err, contents) {
      var parsed = JSON.parse(contents);
      var count = parsed.length;
      parsed.forEach(function (obj) {
        // Iterate over each object and insert it into Mongo
        // I don't care about blockdevices...there are too many of them
        if ( !obj.name.match(/^blockdevice_/) ) {
          var key = obj.name;
          var value = checkNumber(obj.value);
          var parsedValue = stringToObj(value);
          var cert = obj.certname;
          var doc = {};
          doc[key] = parsedValue;
          collection.update({certname: cert}, 
                            {$set: doc}, 
                            {upsert: true}, 
                            function (err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log("Inserted ");
              console.log(doc);
              count--;
              if (count == 0) {
                db.close();
              }
            }
          //Close connection
            if (count == 0) {
              db.close();
              return;
            }
          });
        } else {
          count--;
        }
      });
    });
  }
});
