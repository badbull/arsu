var express = require('express');
var unfinished = require('../models/unfinished');
var config = require('../config');
var rmw = require('./router-middleware');

var router = express.Router();

router.route('/')
  .all(rmw.requireToken)
  .post(function (req, res) {
    unfinished.add(res, req.decodedUser.id, req.body);
  })
  .get(function (req, res) {
    unfinished.get(res, req.decodedUser.id);
  });

router.route('/:id')
  .all(rmw.requireToken)
  .put(function (req, res) {
    unfinished.update(res, req.decodedUser.id, req.params.id, req.body.timestamp);
  })
  .delete(function (req, res) {
    unfinished.delete(res, req.decodedUser.id, req.params.id);
  });

module.exports = router;
