var mongoose = require('mongoose');
var DBURL = process.env.MONGOURL;

mongoose.connect(DBURL);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + DBURL);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

var die = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

process.on('SIGINT', function() {
    die('server termination', function() {
        process.exit(0);
    });
});

require('./users');
