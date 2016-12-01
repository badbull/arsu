const connection = require('../connection');

function Playlist() {

  /**
   * Get all playlists
   */
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from Playlists', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  /**
   * Get a playlist and content by its id
   */
  this.getById = function(res, playlistId) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM Playlists LEFT JOIN PlaylistContent ON Playlists.id=PlaylistContent.playlist_id WHERE Playlists.id=?', playlistId, function(err, result) {
        con.release();
        let output;
        if (!result[0]) {
          return res.status(404).send({message: 'Playlist not found'});
        } else if (!result[0].id) {
          output = {
            playlist_id: playlistId,
            user_id: result[0].user_id,
            playlist_name: result[0].playlist_name,
            content: []
          };
        } else {
          output = {
            playlist_id: result[0].playlist_id,
            user_id: result[0].user_id,
            playlist_name: result[0].playlist_name,
            content: result
          };
          for (let item of output.content) {
            delete item.playlist_id;
            delete item.playlist_name;
            delete item.user_id;
          }
        }
        res.send(output);
      });
    });
  };

  /**
   * Remove a playlist by its id
   * TODO: get rid of nested queries -> fix db: add cascades to fk(s)
   */
  this.delete = function(res, playlistId) {
    connection.acquire(function(err, con) {
      con.query('delete from PlaylistContent where playlist_id=?', playlistId, function(err, result) {
          if (err) {
            con.release();
            return res.status(400).send({message: 'Playlist content deletion failed'});
          }
        con.query('delete from Playlists where id=?', playlistId, function(err, result) {
          con.release();
          if (err) {
            res.status(400).send({message: 'Playlist deletion failed'});
          } else if (result.affectedRows === 0) {
            res.status(404).send({message: 'Playlist not found'});
          } else {
            res.send({message: 'Playlist deleted'});
          }
        });
      });
    });
  };

  /**
   * Get playlists by userid
   */
  this.getByUserId = function(res, userId) {
    connection.acquire(function(err, con) {
      con.query('select * from Playlists where user_id=?', userId, function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  /**
   * Create a new playlist
   */
  this.create = function(res, userId, playlist) {
    playlist.user_id = userId;
    connection.acquire(function(err, con) {
      con.query('insert into Playlists set ?', playlist, function(err, result) {
        con.release();
        if (err) {
          res.status(400).send({message: 'Playlist creation failed'});
        } else {
          res.status(201).send({
            message: 'Playlist created successfully',
            id: result.insertId
          });
        }
      });
    });
  };

  /**
   * Add content to existig playlist
   *
   * TODO: check that current user owns the playlist before adding stuff
   */
  this.addContent = function(res, userId, playlistId, playlistContent) {
    playlistContent.playlist_id = playlistId;
    connection.acquire(function(err, con) {
      con.query('INSERT INTO PlaylistContent SET ?', playlistContent, function(err, result) {
        con.release();
        if (err) {
         res.status(400).send({message: 'Adding playlist content failed'});
        } else {
         res.status(201).send({message: 'Added playlist content successfully'});
        }
      });
    });
  };


}

module.exports = new Playlist();
