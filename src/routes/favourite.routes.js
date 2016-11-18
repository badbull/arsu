var express = require('express');
var favourite = require('../models/favourite');
var config = require('../config');
var rmw = require('./router-middleware');

var router = express.Router();

router.route('/')
  .all(rmw.requireToken)
  .post(function (req, res) {
    favourite.add(res, req.decodedUser.id, req.body);
  })
  .get(function (req, res) {
    favourite.get(res, req.decodedUser.id);
  });

router.route('/:id')
  .delete(rmw.requireToken, function (req, res) {
    favourite.delete(res, req.decodedUser.id, req.params.id);
  });

module.exports = router;
