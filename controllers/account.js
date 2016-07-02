var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.readAccount = function(req, res) {
    if(!req.payload._id) {
        res.status(401).json({
            "message":"UnauthorizedError: private account"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                res.status(200)
                res.json(user.mutants);
            });
    }
};


