var jwt = require('jsonwebtoken');
var user = require('./models/user');
var auth = require('./models/authentication');
var playlist = require('./models/playlist');
var history = require('./models/history');
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

    // logout not used
    // app.get(basePath + 'logout', function(req, res) {
    //     auth.logout(decodedUser.id, res);
    // });

    // User endpoints

    app.route(basePath + 'users')
      .get(function(req, res) {
        user.get(res);
      })
      .post(function(req, res) {
        user.create(res, req.body);
      });

    app.route(basePath + 'users/:id')
      .get(function(req, res) {
        user.getById(res, req.params.id);
      });

    // Playlist endpoints

    app.route(basePath + 'playlists')
      .get(function(req, res) {
        playlist.get(res);
      })
      .post(function(req, res) {
        playlist.create(res, req.body);
      });

    app.get(basePath + 'playlists/user', function(req, res) {
      playlist.getByUserId(res, decodedUser.id);
    });

    app.get(basePath + 'playlists/user/:id', function(req, res) {
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

    // Favourite endpoints

    // Unfinished endpoints

    // Interests endpoints

  }
};
