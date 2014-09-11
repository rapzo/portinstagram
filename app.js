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

var routes = require('./routes/index');
var users = require('./routes/users');
var businesses = require("./routes/businesses");


var api = {
  users: require("./routes/api/users"),
  entries: require("./routes/api/entries"),
  bounties: require("./routes/api/bounties"),
  rewards: require("./routes/api/rewards"),
  btypes: require("./routes/api/business_types"),
  businesses: require("./routes/api/businesses")
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
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

app.use('/login', require('lib/authenticate'));
app.use('/users', users);
app.use('/business', businesses);
app.use('/api/users', api.users);
app.use('/api/entries', api.entries);
app.use('/api/bounties', api.bounties);
app.use('/api/rewards', api.rewards);
app.use('/api/business_types', api.btypes);
app.use('/api/businesses', api.businesses);

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

