var express = require('express');
//var mongodb = require('mongodb');
var url = require('url');
//var User = require('./models/user');
var router = express.Router();
var utils = require('./routeUtils');
var mongo = require('./mongoUtils');
//var passport = require('passport');
//var setUpPassport = require('./setuppassport');
var app = express();
//var MongoClient = mongodb.MongoClient;


//var mongoConnector = 'mongodb://localhost:27017/facts';

/*
router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});
*/

/*
function mongoCount(conn, coll, query, callback) {
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
}

function mongoFind(conn, coll, query, proj, sort, callback) {
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
}

function mongoAgg(conn, coll, agg, callback) {
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
}

function mongoProjectsFind(conn, coll, query, proj, sort, callback) {
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
}

function mongoProjectsCreate(conn, coll, query, callback) {
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
}
*/

/* Need to convert mongo* functions to mongo.* functions */

/* Count things */
router.get('/api1/facts/count', function(req, res) {
  var queryObject = url.parse(req.url, true).query;
  var conditions = utils.stringToObj(queryObject.conditions);
  mongo.factsCount(mongoConnector, 'allFacts', conditions, function(count, db) {
    res.json(count);
    db.close;
  });
});

/* Find things */
router.get('/api1/facts/find', function(req, res) {
  var queryObject = url.parse(req.url, true).query;
  //var validQuery = utils.validateQuery(queryObject);
  var conditions = utils.stringToObj(queryObject.conditions);
  var proj = utils.stringToObj(queryObject.proj);
  var sort = utils.stringToObj(queryObject.sort);
  console.log('query = ', conditions);
  console.log('projection = ', proj);
  console.log('sort = ', sort);
  
  mongo.factsFind(mongoConnector, 'allFacts', conditions, proj, sort, function(found, db) {
    res.json(found);
    db.close();
  });
}); 

/* Aggregate things */
router.get('/api1/facts/aggregate', function(req, res) {
  var queryObject = url.parse(req.url, true).query;
  //var validQuery = utils.validateQuery(queryObject);
  var aggregation = utils.stringToObj(queryObject.agg);
  console.log('aggregation type = ', typeof aggregation);
  console.log('aggregation = ', aggregation);

  mongo.factsAgg(mongoConnector, 'allFacts', aggregation, function(found, db) {
    res.json(found);
    db.close();
  });
});

router.get('/api1/projects/show', function(req, res) {
  var queryObject = url.parse(req.url, true).query;
  var conditions = utils.stringToObj(queryObject.conditions);
  var proj = utils.stringToObj(queryObject.proj);
  var sort = utils.stringToObj(queryObject.sort);
  console.log('query = ', conditions);
  console.log('projection = ', proj);
  console.log('sort = ', sort);

  /*
  mongo.factsProjectsFind(mongoConnector, 'projects', query, proj, sort, function(found, db) {
    res.json(found);
    db.close();
  });
  */
  res.send('project show API');
});


router.post('/api1/project/create', function(req, res) {
  var queryObject = url.parse(req.url, true).query;
  var insert = utils.stringToObj(queryObject.insert);

  mongo.factsProjectsCreate(mongoConnector, 'projects', insert, function(err, result) { 
  });
  res.send('project create API');
});

router.post('/api1/project/update', function(req, res) {
  res.send('project update API');
});

router.post('/api1/project/delete', function(req, res) {
  res.send('project delete API');
});

router.post('/api1/project/associate', function(req, res) {
  res.send('project associate API');
});

/*
app.get('/api1/users', function (res, req) {
  var user = res.param('user');
  res.send('user = ' + user);
});

  User.find()
  .sort({ createdAt: 'descending' })
  .exec(function(err, users) {
    if (err) { return next(err); }
    res.render('index', { users: users });
  }); 
  */  

/*
router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', passport.authenticate("login", {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/signup', function(req, res) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(err, user) {
    if (err) { return next(err); }
    if (user) {
      req.flash('error', 'User already exists');
      return res.redirect('/signup');
    }

    var newUser = new User({
      username: username,
      password: password
    });
    newUser.save(next);
  });
}, passport.authenticate("local", {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/users/:username', function(req, res, next) {
  User.findOne({ username: req.params.username }, function(err, user) {
    if (err) { return next(err); }
    if(!user) { return next(404); }
    res.render('profile', { user: user });
  });
});
*/

module.exports = router;

