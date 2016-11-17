var express = require('express');
var jwt = require('jsonwebtoken');
var user = require('../models/user');
var config = require('../config');

var router = express.Router();

var decodedUser;

/**
 * Check always if token exists (logged in)
 * TODO: Change to proper middleware function
 */
router.all('*', function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  try {
    decodedUser = jwt.verify(token, config.tokenSecret);
    next();
  } catch (err) {
    res.status(401).send({message:'token missing or incorrect'});
  }
});

router.route('/')
  /**
   * @api {get} /users Request User list
   * @apiVersion 0.2.0
   * @apiName GetUsers
   * @apiGroup User
   * @apiPermission token
   * @apiHeader {String} x-access-token Authentication token.
   *
   * @apiSuccess {Object[]} users List of users.
   * @apiSuccess {Number} users.id User id.
   * @apiSuccess {String} users.username Username of the User.
   * @apiSuccess {String} users.email Email address of the User.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [{
   *       "id": 1,
   *       "username": "johnd",
   *       "email": "john@example.com"
   *     }]
   */
  .get(function(req, res) {
    user.get(res);
  })
  /**
   * @api {post} /users Create a new User
   * @apiVersion 0.2.0
   * @apiName PostUser
   * @apiGroup User
   * @apiPermission token
   * @apiHeader {String} x-access-token Authentication token.
   *
   * @apiDescription Creates a new user. To be changed in the future so that a token
   * would not be needed and anyone can create a new user (register to the service)
   *
   * @apiParam {String} username Username of the user.
   * @apiParam {String} password Password of the user.
   * @apiParam {String} email Email address of the user.
   *
   * @apiParamExample {json} Request-Example:
   *    {
   *      "username": "john",
   *      "password": "examplepass",
   *      "email": "john@example.com"
   *    }
   *
   * @apiSuccess (Success 201) {Number} id The new user id.
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 201 Created
   *    {
   *      message: 'User created successfully',
   *      id: 69
   *    }
   */
  .post(function(req, res) {
    user.create(res, req.body);
  })
  /**
   * @api {put} /users Modify user data
   * @apiVersion 0.2.0
   * @apiName PutUser
   * @apiGroup User
   * @apiPermission token
   * @apiHeader {String} [x-access-token] Authentication token.
   * Optional if token is provided in request params or request body.
   *
   * @apiDescription User can change his/her username, password or email address.
   * only the field to be updated is needed.
   *
   * @apiParam {String} [username] Username of the user.
   * @apiParam {String} [password] Password of the user.
   * @apiParam {String} [email] Email address of the user.
   * @apiParam {String} [token] Access token. Optional if it is provided in the request headers or params.
   *
   * @apiParamExample {json} Request-Example:
   *    {
   *      "email": "john.new@example.com"
   *    }
   *
   * @apiSuccess {String} message Message
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "User data updated"
   *     }
   *
   */
  .put(function(req, res) {
    user.edit(res, decodedUser.id, req.body);
  });

router.route('/:id')
  /**
   * @api {get} /users/:id Request User information
   * @apiVersion 0.2.0
   * @apiName GetUser
   * @apiGroup User
   * @apiPermission token
   * @apiHeader {String} x-access-token Authentication token.
   *
   * @apiParam {Number} id Users unique ID.
   *
   * @apiSuccess {Object} user User info.
   * @apiSuccess {String} user.username Username of the User.
   * @apiSuccess {String} user.email email of the User.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "username": "johnd",
   *       "email": "john@example.com"
   *     }
   *
   * @apiError UserNotFound The id of the User was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "message": "User Not Found"
   *     }
   */
  .get(function(req, res) {
    user.getById(res, req.params.id);
  })
  /**
   * @api {delete} /users/:id Delete a user
   * @apiVersion 0.2.0
   * @apiName DeleteUser
   * @apiGroup User
   * @apiPermission admin
   * @apiHeader {String} x-access-token Authentication token.
   *
   * @apiParam {Number} id Unique ID of the user.
   *
   * @apiSuccess {String} message What happened
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "User deleted"
   *     }
   *
   * @apiError UserNotFound The id of the User was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "message": "User Not Found"
   *     }
   */
  .delete(function(req, res) {
    user.deleteById(res, decodedUser, req.params.id);
  });

module.exports = router;
