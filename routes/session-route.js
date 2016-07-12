var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

//login
router.post('/', (req, res) => {
  User.findOne({ email:req.body.user.email }).then(user => {
    if(user) {
      //user exists
      user.authenticate(req.body.user.password, (match) => {
        if(match) {
          //valid password
          var token = jwt.sign({ _id:user._id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 });
          res.json({
            user:user,
            authToken:token
          });
        } else {
          //invalid password
          res.status(401).json({
            message:'invalid credentials'
          });
        }
      })
    } else {
      //no user exists
      res.status(401).json({
        message:'invalid credentials'
      });
    }
  });
});

module.exports = router;
