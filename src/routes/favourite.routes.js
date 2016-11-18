var express = require('express');
var favourite = require('../models/favourite');
var config = require('../config');
var rmw = require('./router-middleware');

var router = express.Router();

router.route('/')
  .all(rmw.requireToken)
 /**
  * @api {post} /favourites Create a new favourite
  * @apiVersion 0.2.0
  * @apiName PostFavourite
  * @apiGroup Favourite
  * @apiPermission token
  * @apiHeader {String} x-access-token Authentication token.
  *
  * @apiDescription Creates a new playlist for the authenticated user.
  *
  * @apiParam {Number} podcast_id Id of the podcast.
  *
  * @apiParamExample {json} Request-Example:
  *    {
  *      "podcast_id": 6
  *    }
  *
  * @apiSuccess (Success 201) {String} message Result of the request.
  * @apiSuccess (Success 201) {Number} id Id of the created playlist.
  *
  * @apiSuccessExample Success-Response:
  *    HTTP/1.1 201 Created
  *    {
  *      message: 'Favourite added',
  *      id: 111
  *    }
  */
  .post(function (req, res) {
    favourite.add(res, req.decodedUser.id, req.body);
  })
 /**
  * @api {get} /favourites Request a list of favourites
  * @apiVersion 0.2.0
  * @apiName GetCurrentUserFavourites
  * @apiGroup Favourite
  * @apiPermission token
  * @apiHeader {String} x-access-token Authentication token.
  *
  * @apiDescription Request a list of favourite podcasts added by authenticated user.
  *
  * @apiSuccess {Object[]} playlists List of lists.
  * @apiSuccess {Number} playlist.id Id of the playlist.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     [
  *       { id: 59, podcast_id: 1, user_id: 149 },
          ...
  *     ]
  */
  .get(function (req, res) {
    favourite.get(res, req.decodedUser.id);
  });

router.route('/:id')
 /**
  * @api {delete} /favourites/:id Delete a favourite
  * @apiVersion 0.2.0
  * @apiName DeleteFavourite
  * @apiGroup Favourite
  * @apiPermission token
  * @apiHeader {String} x-access-token Authentication token.
  *
  * @apiDescription Deletes a favourite of the authenticated user.
  *
  * @apiParam {Number} id Id of the favourite.
  *
  * @apiSuccess {String} message Result of the request.
  *
  * @apiSuccessExample Success-Response:
  *    HTTP/1.1 200 OK
  *    {
  *      message: 'Favourite deleted'
  *    }
  */
  .delete(rmw.requireToken, function (req, res) {
    favourite.delete(res, req.decodedUser.id, req.params.id);
  });

module.exports = router;
