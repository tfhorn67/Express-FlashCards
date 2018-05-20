'use-strict';

// require all the things
const express = require('express'); // Because express is nifty and nice
const app = express(); // This is brevity. It makes it shorter. It saves time and keystrokes.
const bodyParser = require('body-parser'); // For parsing incoming req bodies. Access w/ req.body
const mongoose = require('mongoose'); // For tearing it up w/ MongoDB connections
const sessions = require('express-session'); // For quick and easy session objects
const MongoStore = require('connect-mongo')(sessions); // To use mongo for session storage instead of server RAM

// hook up our mongodb connection
mongoose.connect("mongodb://localhost:27017/FlashCards");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    return true;
});

// make app.js use sessions instead of just standing there looking at it
app.use(sessions({
  secret: 'I like turtles and stuff bro 4uf3989qguifhkbcv3w032dsgbc',
  resave: true,
  saveUninitialized: false,
  store:  new MongoStore({
    url: 'mongodb://localhost:27017/FlashCards'
  })
}));

// make user ID available for state control in template rendering
app.use(function(req, res, next) {
    res.locals.currentUser = req.session.userId;
    next();
})

// parse incoming requests so we can do useful things
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// views engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
const routes = require('./routes/index');
app.use('/', routes);

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
