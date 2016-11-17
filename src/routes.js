var jwt = require('jsonwebtoken');
var user = require('./models/user');
var auth = require('./models/authentication');
var playlist = require('./models/playlist');
var history = require('./models/history');
var favourite = require('./models/favourite');
var unfinished = require('./models/unfinished');
var interest = require('./models/interest');
var config = require('./config');

var decodedUser;

module.exports = {
  configure: function(app) {

    var basePath = app.get('basePath');

    /**
     * Check always if token exists (logged in)
     * TODO: Change to proper middleware function
     */
    app.all(basePath + '*', function (req, res, next) {
      if (req.path === basePath + 'login') {
        next();
      } else {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        try {
          decodedUser = jwt.verify(token, config.tokenSecret);
          next();
        } catch (err) {
          res.status(401).send({message:'token missing or incorrect'});
        }
      }
    });


  /**
  * @apiDefine admin Admin user access only
  * Valid authentication token with admin privileges must be provided within request.
  */

  /**
  * @apiDefine token Logged in user access only
  * Valid authentication token must be provided within request.
  */

   // Authentication endpoints

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
    app.post(basePath + 'login', function(req, res) {
      auth.login(req.body.username, req.body.password, res);
    });


    // User endpoints

    app.route(basePath + 'users')
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

    app.route(basePath + 'users/:id')
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

    // Playlist endpoints

    app.route(basePath + 'playlists')
      /**
      * @api {get} /playlists Request a list of all playlists in service
      * @apiVersion 0.2.0
      * @apiName GetAllPlaylists
      * @apiGroup Playlist
      * @apiPermission token
      * @apiHeader {String} x-access-token Authentication token.
      *
      * @apiSuccess {Object[]} playlists List of lists.
      * @apiSuccess {Number} playlist.id Id of the playlist.
      * @apiSuccess {String} playlist.playlist_name Name of the playlist.
      * @apiSuccess {Number} playlist.user_id User id of the playlist's owner.
      *
      * @apiSuccessExample Success-Response:
      *     HTTP/1.1 200 OK
      *     [{
      *       "id": 11,
      *       "playlistname": "johnd",
      *       "user_id": 69
      *     }]
      */
      .get(function(req, res) {
        playlist.get(res);
      })
      /**
      * @api {post} /playlists Create a new Playlist
      * @apiVersion 0.2.0
      * @apiName PostPlaylist
      * @apiGroup Playlist
      * @apiPermission token
      * @apiHeader {String} x-access-token Authentication token.
      *
      * @apiDescription Creates a new playlist for the authenticated user.
      *
      * @apiParam {String} playlist_name Name of the playlist.
      *
      * @apiParamExample {json} Request-Example:
      *    {
      *      "playlist_name": "My playlist"
      *    }
      *
      * @apiSuccess (Success 201) {String} message Result of the request.
      * @apiSuccess (Success 201) {Number} id Id of the created playlist.
      *
      * @apiSuccessExample Success-Response:
      *    HTTP/1.1 201 Created
      *    {
      *      message: 'Playlist created successfully',
      *      id: 11
      *    }
      */
      .post(function(req, res) {
        playlist.create(res, decodedUser.id, req.body);
      });

    app.get(basePath + 'playlists/user', function(req, res) {
      playlist.getByUserId(res, decodedUser.id);
    });

    app.route(basePath + 'playlists/user/:id')
      .get(function(req, res) {
        playlist.getByUserId(res, req.params.id);
      });

    app.route(basePath + 'playlists/:id')
      .get(function(req, res) {
        playlist.getById(res, req.params.id);
      })
      .delete(function(req, res) {
        playlist.delete(res, req.params.id);
      })
      .put(function(req, res) {
        playlist.addContent(res, decodedUser.id, req.params.id, req.body);
      });

    // History endpoints

    app.route(basePath + 'history')
      .post(function (req, res) {
        history.addEntry(res, decodedUser.id, req.body);
      })
      .get(function (req, res) {
        history.getEntries(res, decodedUser.id);
      });

    app.route(basePath + 'history/:id')
      .delete(function (req, res) {
        history.deleteEntry(res, decodedUser.id, req.params.id);
      });

    // Favourites endpoints

    app.route(basePath + 'favourites')
      .post(function (req, res) {
        favourite.add(res, decodedUser.id, req.body);
      })
      .get(function (req, res) {
        favourite.get(res, decodedUser.id);
      });

    app.route(basePath + 'favourites/:id')
      .delete(function (req, res) {
        favourite.delete(res, decodedUser.id, req.params.id);
      });

    // Unfinished endpoints

    app.route(basePath + 'unfinished')
      .post(function (req, res) {
        unfinished.add(res, decodedUser.id, req.body);
      })
      .get(function (req, res) {
        unfinished.get(res, decodedUser.id);
      });

    app.route(basePath + 'unfinished/:id')
      .put(function (req, res) {
        unfinished.update(res, decodedUser.id, req.params.id, req.body.timestamp);
      })
      .delete(function (req, res) {
        unfinished.delete(res, decodedUser.id, req.params.id);
      });

    // Interests endpoints

    app.route(basePath + 'interests')
      .post(function (req, res) {
        interest.add(res, decodedUser.id, req.body);
      })
      .get(function (req, res) {
        interest.get(res, decodedUser.id);
      });
    app.route(basePath + 'interests/:id')
      .delete(function (req, res) {
        interest.delete(res, decodedUser.id, req.params.id);
      });

  }
};
