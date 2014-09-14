// cause we like it :-p
require('coffee-script/register');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var busboy = require('connect-busboy');

var routes = require('./routes/index');
var users = require('./routes/users');
var businesses = require("./routes/businesses");
var bounties = require('lib/bounties');

var User = require('models/user');

var api = {
  users: require("./routes/api/users"),
  entries: require("./routes/api/entries"),
  bounties: require("./routes/api/bounties"),
  rewards: require("./routes/api/rewards"),
  btypes: require("./routes/api/business_types"),
  businesses: require("./routes/api/businesses")
};

var auth = require('lib/authenticate/middleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.raw(type='multipart/form-data'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(busboy());

/**
 * Sessions
 */
var redis_opts = {
  host: '127.0.0.1',
  port: 6379
};

app.use(cookieParser());
app.use(session({
  store: new RedisStore(redis_opts),
  secret: 'ptaqpriuesmerd4!!442%',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * And them statics
 */
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Stuffs about the app
 */
app.set('title', 'Portinstagram');

app.use('/', routes);

app
  .use('/login', require('lib/authenticate')(passport))
  .get('/login', function (req, res) {
    if (req.isAuthenticated()) res.redirect('/');

    res.render('sessions/login', { title: 'login' });
  });

app.get('/logout', function (req, res) {
  if (!req.isAuthenticated()) res.redirect('/login');

  req.logout();
  res.redirect('/');
});

app.use('/profile', auth.current_user, function (req, res) {
  if (!req.isAuthenticated()) res.redirect('/login');

  new User({ id: req.user.id }).fetch()
    .then(function (user) {
      res.render('users/view', {
        title: 'π ' + user.get('username'),
        user: user.toJSON()
      });
    }).catch(function () {
      res.redirect('/login');
    })
})

app.use('/users', auth.current_user, users);
app.use('/business', auth.current_user, businesses);
app.use('/bounties', auth.current_user, bounties);

app.use('/api/users', auth.current_user, api.users);
app.use('/api/entries', auth.current_user, api.entries);
app.use('/api/bounties', auth.current_user, api.bounties);
app.use('/api/rewards', auth.current_user, api.rewards);
app.use('/api/business_types', auth.current_user, api.btypes);
app.use('/api/businesses', auth.current_user, api.businesses);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('errors/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('errors/error', {
    message: err.message,
    error: ["I'm so so so sorry T_T"]
  });
});


module.exports = app;
