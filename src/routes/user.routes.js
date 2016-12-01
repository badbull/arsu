const express = require('express');
const user = require('../models/user');
const rmw = require('./router-middleware');

const router = express.Router();

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
  .get(rmw.requireToken, function(req, res) {
    user.get(res);
  })
  /**
   * @api {post} /users Create a new User
   * @apiVersion 0.2.0
   * @apiName PostUser
   * @apiGroup User
   * @apiPermission all
   *
   * @apiDescription Creates a new user. No authentication needed.
   * Anyone can create a new user (register to the service).
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
  .put(rmw.requireToken, function(req, res) {
    user.edit(res, req.decodedUser.id, req.body);
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
  .get(rmw.requireToken, function(req, res) {
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
  .delete(rmw.requireToken, function(req, res) {
    user.deleteById(res, req.decodedUser, req.params.id);
  });

module.exports = router;
