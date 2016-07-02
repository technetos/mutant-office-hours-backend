var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');

require('./models/db');
require('./config/passport');

var routesApi = require('./routes/index');

var server = express();

server.use(logger('dev'));

server.use(bodyParser.json());

server.use(bodyParser.urlencoded({
    extended:false
}));

server.use(cookieParser());

// Setup ../mutant-office-hours directory to serve static resources from
server.use(express.static(path.join(__dirname, '../mutant-office-hours')));

// Initialize passport before the route middleware
server.use(passport.initialize());

// Setup /api route
server.use('/', routesApi);

// Serve the app
server.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../mutant-office-hours', 'index.html'));
});

// Catch 404 and forward to error handler
server.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// Catch unauthorized errors
server.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({
            "message":err.name + ": " + err.message
        });
    }
});

server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = server;
