var exports = module.exports = {};
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var mongoConnector = 'mongodb://localhost:27017/facts';

/* Count stuff */
exports.factsCount = function factsCount(coll, query, callback) {
  MongoClient.connect(mongoConnector, function (err, db) {
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
exports.factsFind = function factsFind(conn, coll, query, proj, sort, callback) {
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
exports.factsAgg = function factsAgg(conn, coll, agg, callback) {
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
exports.ProjectsFind = function ProjectsFind(conn, coll, query, proj, sort, callback) {
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
exports.ProjectsCreate = function ProjectsCreate(conn, coll, query, callback) {
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

