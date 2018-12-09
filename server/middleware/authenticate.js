const _ = require('lodash');
var { User } = require('./../models/user');

var authenticate = (req, res, next) => {
  console.log(req.body); 
  
  var token = _.pick(req.body, ['token']);
  console.log(token.token);
  
  User.findByToken(token.token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
  //  req.token = token.token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};