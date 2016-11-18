var express = require('express');
var playlist = require('../models/playlist');
var config = require('../config');
var rmw = require('./router-middleware');

var router = express.Router();

router.route('/')
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
  .get(rmw.requireToken, function(req, res) {
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
  .post(rmw.requireToken, function(req, res) {
    playlist.create(res, req.decodedUser.id, req.body);
  });

router.route('/user')
  .get(rmw.requireToken, function(req, res) {
    playlist.getByUserId(res, req.decodedUser.id);
  });

router.route('/user/:id')
  .get(rmw.requireToken, function(req, res) {
    playlist.getByUserId(res, req.params.id);
  });

router.route('/:id')
  .get(rmw.requireToken, function(req, res) {
    playlist.getById(res, req.params.id);
  })
  .delete(rmw.requireToken, function(req, res) {
    playlist.delete(res, req.params.id);
  })
  .put(rmw.requireToken, function(req, res) {
    playlist.addContent(res, req.decodedUser.id, req.params.id, req.body);
  });

module.exports = router;
