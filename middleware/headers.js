module.exports = (req, res, next) => {
  //cors
  res.header('Access-Control-Allow-Origin', '*');
  //content-type header for json payloads
  //authorization header for json web tokens
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  //get post put delete
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  next();
};
