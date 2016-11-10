var connection = require('../connection');

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
      con.query('SELECT * FROM Playlists JOIN PlaylistContent ON Playlists.id=PlaylistContent.playlist_id WHERE Playlists.id=?', playlistId, function(err, result) {
        con.release();
        if (!result[0]) {
          res.status(404).send({message: 'Playlist not found', error: err ? err : "none"});
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
          res.send(output);
        }
      });
    });
  };

  /**
   * Remove a playlist by its id
   */
  this.delete = function(res, playlistId) {
    connection.acquire(function(err, con) {
      con.query('delete from Playlists where id=?', playlistId, function(err, result) {
        con.release();
        if (result.affectedRows === 0) {
          res.status(404).send({message: 'Playlist not found'});
        } else {
          res.send({message: 'Playlist deleted'});
        }
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
  this.create = function(res, playlist) {
    connection.acquire(function(err, con) {
      con.query('insert into Playlists set ?', playlist, function(err, result) {
        if (err) {
          con.release();
          res.status(400).send({message: 'Playlist creation failed'});
          return;
        }
        con.query('SELECT LAST_INSERT_ID()', function(err, result) {
          con.release();
          if (err) {
            res.status(400).send({message: 'Playlist creation failed'});
          } else {
            res.status(201).send({message: 'Playlist created successfully',
                                  id: result[0]['LAST_INSERT_ID()']
                                });
          }
        });
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
        //  console.log(err);
         res.status(400).send({message: 'Adding playlist content failed'});
        } else {
         res.status(201).send({message: 'Added playlist content successfully'});
        }
      });
    });
  };


}

module.exports = new Playlist();
