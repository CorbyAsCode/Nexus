var express = require('express');
var url = require('url');
//var User = require('./models/user');
var router = express.Router();
var utils = require('./routeUtils');
var mongo = require('./mongoUtils');
//var passport = require('passport');
//var setUpPassport = require('./setuppassport');
var app = express();

/*
router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});
*/

/* Count things */
router.get('/api1/facts/count', function(req, res) {
  var queryObject = url.parse(req.url, true).query;
  var conditions = utils.stringToObj(queryObject.conditions);
  mongo.factsCount('allFacts', conditions, function(count, db) {
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

router.get('/api1/project/find', function(req, res) {
  var queryObject = url.parse(req.url, true).query;
  var conditions = utils.stringToObj(queryObject.conditions);
  var proj = utils.stringToObj(queryObject.proj);
  var sort = utils.stringToObj(queryObject.sort);
  console.log('query = ', conditions);
  console.log('projection = ', proj);
  console.log('sort = ', sort);

  mongo.projectsFind(conditions, proj, sort, function(result) {
    res.json(result);
  });
  
  //res.send('project show API');
});


router.post('/api1/project/create', function(req, res) {
  var queryObject = url.parse(req.url, true).query;
  var insert = utils.stringToObj(queryObject.insert);

  mongo.projectsCreate(insert, function(result) {
    res.json(result);
  });
});

router.post('/api1/project/update', function(req, res) {
  var queryObject = url.parse(req.url, true).query;
  console.log('queryObject: ' + queryObject);
  var conditions = utils.stringToObj(queryObject.conditions);
  var update = utils.stringToObj(queryObject.update);

  mongo.projectsUpdate(conditions, update, function(result) {
    res.send('project update API');
  });
});

router.post('/api1/project/delete', function(req, res) {
  var queryObject = url.parse(req.url, true).query;
  var conditions = utils.stringToObj(queryObject.conditions);
  
  mongo.projectsDelete(conditions, function(result) {
    res.send('project delete API');
  });
});

router.post('/api1/project/associate', function(req, res) {
  var queryObject = url.parse(req.url, true).query;
  var projectName = utils.stringToObj(queryObject.project);
  var fqdnQuery = utils.stringToObj(queryObject.fqdn);

  mongo.projectsAssoc(projectName, fqdn, function(result) {
    res.send('project associate API');
  });
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

