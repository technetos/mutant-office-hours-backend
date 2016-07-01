var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {
    var user = new User();
    
    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token":token
        });
    });
};

module.exports.login = function(req, res) {
    passport.authenticate('local', function(err, user, info) {
        var token;

        if(err) {
            res.status(404).json(err);
            return;
        }

        if(user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token":token
            });
        } else {
            // User not found
            res.status(401).json(info);
        }
    })(req, res);
};
