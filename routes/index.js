var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.SECRET,
    userProp: 'payload'
});

var ctrlAccount = require('../controllers/account');
var ctrlAuth = require('../controllers/auth');

// Account
router.get('/profile', auth, ctrlAccount.readAccount);

// Auth
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
