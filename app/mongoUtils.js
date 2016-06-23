var exports = module.exports = {};
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var mongoConnector = 'mongodb://localhost:27017/facts';

/* Count stuff */
exports.mongoCount = function mongoCount(conn, coll, query, callback) {
  MongoClient.connect(conn, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //We are connected. :)
      console.log('Connection established to', conn);
      var collection = db.collection(coll);

      collection.count(query, function (err, result) {
        if (err) {
          console.log('mongoCount error: ', err);
        } else {
          console.log('mongoCount.result = ' + result + '\n');
          callback(result, db);

        }
      });
    }
  });
};

/* Find stuff */
exports.mongoFind = function mongoFind(conn, coll, query, proj, sort, callback) {
  MongoClient.connect(conn, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //We are connected. :)
      console.log('Connection established to', conn);
      var collection = db.collection(coll);
      var cursor = collection.find(query, proj).sort(sort);
      var results = [];
      cursor.each(function(err, doc) {
        if (err) {
          console.log('mongoFind error: ', err);
        } else if (doc != null) {
          results.push(doc);
        } else {
          callback(results, db);
        }
      });
    }
  });
};

/* Aggregate stuff */
exports.mongoAgg = function mongoAgg(conn, coll, agg, callback) {
  MongoClient.connect(conn, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //We are connected. :)
      console.log('Connection established to', conn);
      var collection = db.collection(coll);
      collection.aggregate(agg).toArray(function(err, result) {
        if (err) {
          console.log('mongoAgg error: ', err);
        } else {
          callback(result, db);
        }
      });
    }
  });
};

/* Find Projects */
exports.mongoProjectsFind = function mongoProjectsFind(conn, coll, query, proj, sort, callback) {
  MongoClient.connect(conn, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //We are connected. :)
      console.log('Connection established to', conn);
      var collection = db.collection(coll);
      var cursor = collection.find(query, proj).sort(sort);
      var results = [];
      cursor.each(function(err, doc) {
        if (err) {
          console.log('mongoProjectShow error: ', err);
        } else if (doc != null) {
          results.push(doc);
        } else {
          callback(results, db);
        }
      });
    }
  });
};

/* Create projects */
exports.mongoProjectsCreate = function mongoProjectsCreate(conn, coll, query, callback) {
   MongoClient.connect(conn, function (err, db) {
     if (err) {
       console.log('Unable to connect to the mongoDB server. Error:', err);
     } else {
       //We are connected. :)
       console.log('Connection established to', conn);
       var collection = db.collection(coll);
       collection.insert(query, function(err, result) {
         if (err) {
           console.log('mongoProjectsCreate error: ', err);
         } else {
           callback(err, result);
           db.close();
         }
       });
     }
  });
};

