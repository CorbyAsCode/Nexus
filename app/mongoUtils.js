var exports = module.exports = {};
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var Project = require('./models/project');
var mongoConnector = 'mongodb://localhost:27017/facts';

/* Count stuff */
exports.factsCount = function factsCount(coll, query, callback) {
  MongoClient.connect(mongoConnector, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //We are connected. :)
      console.log('Connection established to', mongoConnector);
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
exports.factsFind = function factsFind(coll, query, proj, sort, callback) {
  MongoClient.connect(mongoConnector, function (err, db) {
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
exports.factsAgg = function factsAgg(coll, agg, callback) {
  MongoClient.connect(mongoConnector, function (err, db) {
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
exports.projectsFind = function projectsFind(query, proj, sort, callback) {
  Project.find(query, function(err, found) {
    var result = '';
    if (err) {
      result = err;
    } else {
      result = found;
    }
    callback(result);
  });
};

/* Create projects */
exports.projectsCreate = function projectsCreate(insert, callback) {
  var project = new Project(insert);
  project.save(function(err) {
    var result = '';
    if (err) { 
      result = 'projectsCreate error: ' + err.toString();
    } else {
      result = 'Project saved successfully!';
    }
    callback(result);
  });
};

/* Update projects */
exports.projectsUpdate = function projectsUpdate(conditions, update, callback) {
  Project.findOneAndUpdate(conditions, update, function(err, project) {
    if (err) {
      console.log('Project.findOneAndUpdate error: ', err);
    } else {
      callback(project);
    }
  });
};

/* Delete projects */
exports.projectsDelete = function projectsDelete(conditions, callback) {
  Project.findOne(conditions, function(err, project) {
    if (err) {
      console.log('projectsDelete error: ', err);
    } else {
      project.remove(function(err) {
        if (err) {
          console.log('projectsDelete remove error: ', err);
        } else {
          callback('project removed');
        }
      });
    }
  });
};

/* Associate a project with a server */
exports.projectsAssoc = function projectsAssoc(projectName, fqdn, callback) {
  MongoClient.connect(mongoConnector, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //We are connected. :)
      console.log('Connection established to', conn);
      var collection = db.collection(coll);
      collection.findAndModify({fqdn:fqdn},
          [[]],
          {$set:{stakeholder:projectName}},
          {new:true}, function(err, facts) {
        if (err) {
          console.log('projectsAssoc error: ', err);
        } else {
          callback(facts);
        }
      });
    }
  });
};







