var express = require('express');
var mongodb = require('mongodb');
var url = require('url');
//var User = require('./models/user');
var router = express.Router();
//var passport = require('passport');
//var setUpPassport = require('./setuppassport');
var app = express();
var MongoClient = mongodb.MongoClient;


var mongoConnector = 'mongodb://localhost:27017/facts';

/*
router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});
*/

var checkForBooleans = function(value) {
  if (value.match(/^(true|false)$/)) {
    return ('true' === value);
  } else {
    return value;
  }
};

var validateQuery = function(queryObject) {
  var newQueryObj = {};
  for (var attr in queryObject) {
    newQueryObj[attr] = checkForBooleans(queryObject[attr]);
  };
  return newQueryObj;
};

router.get('/api1/count', function(req, res) {
  var queryObject = url.parse(req.url, true).query;
  var validQuery = validateQuery(queryObject);
  console.log('validQuery = ', validQuery);


  MongoClient.connect(mongoConnector, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //We are connected. :)
      console.log('Connection established to', mongoConnector);
      var collection = db.collection('allFacts');

      collection.count(validQuery, function (err, result) {
        if (err) {
          console.log('Error in query', err);
        } else {
          res.send('Result = ' + result + '\n');
        }
      });
    }
  }); 
});

app.get('/api1/users', function (res, req) {
  var user = res.param('user');
  res.send('user = ' + user);
});

  /*
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

