var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = (req, res, next) => {
  if(isPreflight(req) || isLoggingInOrSigningUp(req)) { next(); return; }
  
  // otherwise

  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if(!payload) {
      //verification failed
      res.status(401).json({ message: 'authorization required' });
      return;
    }
    // verification succeeded locate user
    User.findOne({ _id:payload._id }).then(user => {
      // add user to request middleware style
      if(user) { req.user = user; next(); } else {
        // otherwise respond with 401
        res.status(401).json({ message: 'authorization required' });
      }
    });
  });
}

function isLoggingInOrSigningUp(req) {
  if(req.method.toLowerCase() !== 'post') { return false; }
  const logginIn = req.originalUrl.includes('sessions');
  const signingUp = req.originalUrl.includes('users');
  return (loggingIn || signingUp);
}

function isPreflight(req) {
  return (req.method.toLowerCase() === 'options');
}
