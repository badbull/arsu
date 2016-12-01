const express = require('express');
const history = require('../models/history');
const rmw = require('./router-middleware');

const router = express.Router();

router.route('/')
  .all(rmw.requireToken)
 /**
  * @api {post} /history Create a new history entry
  * @apiVersion 0.2.0
  * @apiName PostHistory
  * @apiGroup History
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
  * @apiSuccess (Success 201) {Number} id Id of the created history entry.
  *
  * @apiSuccessExample Success-Response:
  *    HTTP/1.1 201 Created
  *    {
  *      message: 'History entry added',
  *      id: 111
  *    }
  */
  .post(function (req, res) {
    history.addEntry(res, req.decodedUser.id, req.body);
  })
 /**
  * @api {get} /history Request a list of history entries
  * @apiVersion 0.2.0
  * @apiName GetCurrentUserHistory
  * @apiGroup History
  * @apiPermission token
  * @apiHeader {String} x-access-token Authentication token.
  *
  * @apiDescription Request a list of podcast history by authenticated user.
  *
  * @apiSuccess {Object[]} history List of history items.
  * @apiSuccess {Number} history.id Id of the history entry.
  * @apiSuccess {Number} history.podcast_id Id of the podcast.
  * @apiSuccess {Number} history.user_id Id of the user.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     [
  *       { id: 59, podcast_id: 1, user_id: 149 },
          ...
  *     ]
  */
  .get(function (req, res) {
    history.getEntries(res, req.decodedUser.id);
  });

router.route('/:id')
 /**
  * @api {delete} /history/:id Delete a history entry
  * @apiVersion 0.2.0
  * @apiName DeleteHistory
  * @apiGroup History
  * @apiPermission token
  * @apiHeader {String} x-access-token Authentication token.
  *
  * @apiDescription Deletes a history entry of the authenticated user.
  *
  * @apiParam {Number} id Id of the history entry.
  *
  * @apiSuccess {String} message Result of the request.
  *
  * @apiSuccessExample Success-Response:
  *    HTTP/1.1 200 OK
  *    {
  *      message: 'History entry deleted'
  *    }
  */
  .delete(rmw.requireToken, function (req, res) {
    history.deleteEntry(res, req.decodedUser.id, req.params.id);
  });

module.exports = router;
