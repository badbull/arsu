var express = require('express');
var interest = require('../models/interest');
var config = require('../config');
var rmw = require('./router-middleware');

var router = express.Router();

router.route('/')
  .all(rmw.requireToken)
  .post(function (req, res) {
    interest.add(res, req.decodedUser.id, req.body);
  })
  .get(function (req, res) {
    interest.get(res, req.decodedUser.id);
  });

router.route('/:id')
  .delete(rmw.requireToken, function (req, res) {
    interest.delete(res, req.decodedUser.id, req.params.id);
  });

module.exports = router;
