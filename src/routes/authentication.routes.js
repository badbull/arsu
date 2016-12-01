const express = require('express');
const auth = require('../models/authentication');

const router = express.Router();

/**
 * @apiDefine all No authentication needed.
 */

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */

/**
 * @apiDefine admin Admin user access only
 * Valid authentication token with admin privileges must be provided within request.
 */

/**
 * @api {post} /login Login
 * @apiVersion 0.2.0
 * @apiName PostAuth
 * @apiGroup Authentication
 * @apiPermission all
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
