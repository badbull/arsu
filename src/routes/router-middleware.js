/**
 * Common middleware functions for routing.
 */
const jwt = require('jsonwebtoken');
const config = require('../config');

const routerMiddleware = {

  requireToken: function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    try {
      req.decodedUser = jwt.verify(token, config.tokenSecret);
      next();
    } catch (err) {
      res.status(401).send({message:'token missing or incorrect'});
    }
  },

  logger: function (req, res, next) {
    console.log('User id: ' + req.decodedUser.id);
    next();
  }

};

module.exports = routerMiddleware;
