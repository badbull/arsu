var express = require('express');
var history = require('../models/history');
var config = require('../config');
var rmw = require('./router-middleware');

var router = express.Router();

router.route('/')
  .all(rmw.requireToken)
  .post(function (req, res) {
    history.addEntry(res, req.decodedUser.id, req.body);
  })
  .get(function (req, res) {
    history.getEntries(res, req.decodedUser.id);
  });

router.route('/:id')
  .delete(rmw.requireToken, function (req, res) {
    history.deleteEntry(res, req.decodedUser.id, req.params.id);
  });

module.exports = router;
