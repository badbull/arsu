const express = require('express');
const playlist = require('../models/playlist');
const rmw = require('./router-middleware');

const router = express.Router();

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
 /**
  * @api {get} /playlists/user Request a list of playlists of user
  * @apiVersion 0.2.0
  * @apiName GetCurrentUserPlaylists
  * @apiGroup Playlist
  * @apiPermission token
  * @apiHeader {String} x-access-token Authentication token.
  *
  * @apiDescription Request a list of playlists created by authenticated user.
  *
  * @apiSuccess {Object[]} playlists List of lists.
  * @apiSuccess {Number} playlist.id Id of the playlist.
  * @apiSuccess {String} playlist.playlist_name Name of the playlist.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     [
  *       { id: 75, playlist_name: 'Test playlist', user_id: 151 },
  *       ...
  *     ]
  */
  .get(rmw.requireToken, function(req, res) {
    playlist.getByUserId(res, req.decodedUser.id);
  });

router.route('/user/:id')
 /**
  * @api {get} /playlists/user/:id Request a list of playlists of user
  * @apiVersion 0.2.0
  * @apiName GetUserPlaylists
  * @apiGroup Playlist
  * @apiPermission token
  * @apiHeader {String} x-access-token Authentication token.
  *
  * @apiDescription Request a list of playlists created by specific user.
  *
  * @apiParam {Number} id Id of the user.
  *
  * @apiSuccess {Object[]} playlists List of lists.
  * @apiSuccess {Number} playlist.id Id of the playlist.
  * @apiSuccess {String} playlist.playlist_name Name of the playlist.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     [
  *       { id: 75, playlist_name: 'Test playlist', user_id: 151 },
  *       ...
  *     ]
  */
  .get(rmw.requireToken, function(req, res) {
    playlist.getByUserId(res, req.params.id);
  });

router.route('/:id')
 /**
  * @api {get} /playlists/:id Request a playlist
  * @apiVersion 0.2.0
  * @apiName GetPlaylist
  * @apiGroup Playlist
  * @apiPermission token
  * @apiHeader {String} x-access-token Authentication token.
  *
  * @apiDescription Request a full playlist incl. contents created by authenticated user.
  *
  * @apiParam {Number} id Id of the playlist.
  *
  * @apiSuccess {Number} id Id of the playlist.
  * @apiSuccess {Number} user_id Id of the owner.
  * @apiSuccess {String} playlist_name Name of the playlist.
  * @apiSuccess {Object[]} content List of playlist items.
  * @apiSuccess {Number} content.id Id of the playlist item.
  * @apiSuccess {Number} content.podcast_id Id of the podcast.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       playlist_id: 75,
  *       user_id: 151,
  *       playlist_name: 'Test playlist',
  *       content: [
  *         { id: 75, podcast_id: 1 },
  *         ...
  *       ]
  *     }
  */
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
