var db = require('mongoose');

//db.connect(process.env.MONGOURL);
db.connect("mongodb://127.0.0.1");

db.connection.on('connected', function() {
    console.log('Mongoose connected');
});

db.connection.on('error', function(err) {
    console.log('Mongoose connection error ' + err);
});

db.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

var die = function(msg, callback) {
    db.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

process.on('SIGINT', function() {
    die('server termination', function() {
        process.exit(0);
    });
});

module.exports = db;
