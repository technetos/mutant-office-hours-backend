var db = require('../config/db');
var bcrypt = require('bcryptjs');
//var mutantSchema = require('./mutant-schema');

var userSchema = db.Schema({
  email:{
    type:String,
    required:true,
    unique:true,
  },
  passwordDigest:{
    type:String,
    required:true,
  },
  updated_at:{
    type:Date,
    default:Date.now
  },
  //mutantData:[mutantSchema],
});

userSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

userSchema.methods.toJSON = function() {
  var user = this.toObject();
  delete user.passwordDigest;
  delete user.__v;
  return user;
};

userSchema.methods.authenticate = function(password, callback) {
  console.log('checking incoming authentication');
  bcrypt.compare(password, this.passwordDigest, function(err, match) {
    callback(match);
  });
};

module.exports = userSchema;
