var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var userRoute = require('./routes/user-route');
//var mutantRoute = require('./routes/mutant-route');
var sessionRoute = require('./routes/session-route');
var headerMiddleware = require('./middleware/headers');
var authMiddleware = require('./middleware/auth');

var server = express();

server.use(headerMiddleware);
server.use(authMiddleware);
server.use(bodyParser.json());

//server.use('/api/v1/mutants', mutantRoute);
server.use('/api/v1/users', userRoute);
server.use('/api/v1/session', sessionRoute);


app.listen(3030, function() {
  console.log('listening on 127.0.0.1:3030');
});
