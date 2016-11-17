var express = require('express');
var auth = require('../models/authentication');

var router = express.Router();

/**
 * @api {post} /login Login
 * @apiVersion 0.2.0
 * @apiName PostAuth
 * @apiGroup Authentication
 * @apiPermission none
 *
 * @apiDescription Log in and get token for the user.
 *
 * @apiParam {String} username Username of the user.
 * @apiParam {String} password Password of the user.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "username": "john",
 *      "password": "examplepass"
 *    }
 *
 *  @apiSuccess {String} token Token for the user authentication.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      message: 'Logged in successfully',
 *      token: 'eyJhIkpXVCJ9.ey2NywiZXhwIjoxNDc4NTQwNDY3fQ.BPfXvi5RyAQ'
 *    }
 *
*/
router.route('/')
  .post(function(req, res) {
    auth.login(req.body.username, req.body.password, res);
  });

module.exports = router;
