var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new localStrategy({
        usernameFeild:'email'
    },
    function(username, password, done) {
        User.findOne({
            email:username
        }, 
        function(err, user) {
            if(err) {
                return done(err);
            }
            if(!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            // Return if password is wrong
            if(!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            // If credentials are invalid, return the user object
            return done(null, user);
        });
    }
));
