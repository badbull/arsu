var jwt = require('jsonwebtoken');
var user = require('./models/user');
var auth = require('./models/authentication');
var playlist = require('./models/playlist');
var history = require('./models/history');
var favourite = require('./models/favourite');
var config = require('./config');

var decodedUser;

module.exports = {
  configure: function(app) {

    var basePath = app.get('basePath');

    /**
     * Check always if token exists (logged in)
     */
    app.all(basePath + '*', function (req, res, next) {
      if (req.path === basePath + 'login' ) {
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

    // Authentication endpoints

    app.post(basePath + 'login', function(req, res) {
      auth.login(req.body.username, req.body.password, res);
    });


    // User endpoints

    app.route(basePath + 'users')
    /**
     * @api {get} users Request User list
     * @apiName GetUsers
     * @apiGroup User
     *
     * @apiSuccess {Object[]} users List of users.
     * @apiSuccess {Number} users.id User id.
     * @apiSuccess {String} users.username Username of the User.
     * @apiSuccess {String} users.email Email address of the User.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *       "userid": 1,
     *       "username": "johnd",
     *       "email": "john@example.com"
     *     }]
     */
      .get(function(req, res) {
        user.get(res);
      })
      .post(function(req, res) {
        user.create(res, req.body);
      })
      .put(function(req, res) {
        user.edit(res, decodedUser.id, req.body);
      });

    app.route(basePath + 'users/:id')
    /**
     * @api {get} users/:id Request User information
     * @apiName GetUser
     * @apiGroup User
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
      .delete(function(req, res) {
        user.deleteById(res, decodedUser, req.params.id);
      });

    // Playlist endpoints

    app.route(basePath + 'playlists')
      .get(function(req, res) {
        playlist.get(res);
      })
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
      })

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
      })

    // Unfinished endpoints

    // Interests endpoints

  }
};
