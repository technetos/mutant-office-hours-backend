var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

//create user
router.post('/', function(req, res) {
  if(!passwordPresent(req.body.user) || !passwordMatch(req.body.user)) {
    res.status(422).json({ message: 'passwords must match' });
    return;
  }
  var user = new User({
    email:req.body.email,
    passwordDigest: bcrypt.hashSync(req.body.user.password, 10)
  });
  user.save().then(userData => {
    var token = jwt.sign({ _id:userData._id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 });
    res.json({
      user:userData,
      authToken:token
    });
  });
});

// update user
router.put('/:id', (req, res) => {
  User.findOne({ _id:req.params.id }).then(user => {
    user.email = req.body.user.email;
    user.save().then(() => {
      res.json({ user })
    },
    // fail
    () => {
      res.status(422).json({
        message:'unable to update user'
      });
    });
  },
  // no user exists
  () => {
    res.status(404).json({
      message:'user does not exist'
    });
  });
});

module.exports = router;

function passwordPresent(payload) {
  return (payload.password && payload.passwordConfirmation)
}

function passwordMatch(payload) {
  return (payload.password === payload.passwordConfirmation)
}
