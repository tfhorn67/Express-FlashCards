'use-strict';

// require all the things
const express = require('express'); // Because express is nifty and nice
const app = express(); // This is brevity. It makes it shorter. It saves time and keystrokes.
const bodyParser = require('body-parser'); // For parsing incoming req bodies. Access w/ req.body
const mongoose = require('mongoose'); // For tearing it up w/ MongoDB connections
const userSessions = require('express-sessions'); // For quick and easy session objects
//const mongoSeshSaver = require('connect-mongo')(userSessions); // To use mongo for session storage instead of server RAM

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// views engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// GET '/' requests
app.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listen on port 3000 by default
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});
