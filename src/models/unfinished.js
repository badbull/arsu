var connection = require('../connection');

function Unfinished() {

  /**
   * Get unfinished items of the user
   */
  this.get = function(res, userId) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM Unfinished WHERE user_id=?', userId, function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  /**
   * Create a new unfinished
   */
  this.add = function(res, userId, entry) {
    connection.acquire(function(err, con) {
      entry.user_id = userId;
      con.query('INSERT INTO Unfinished SET ?', entry, function(err, result) {
        con.release();
        if (err) {
          res.status(400).send({
            message: 'Adding Unfinished failed'
          });
        } else {
          res.status(201).send({
            message: 'Unfinished added',
            id: result.insertId
          });
        }
      });
    });
  };

  /**
   * Update the timestamp of an existing unfinished entry
   */
  this.update = function(res, userId, entryId, timestamp) {
    connection.acquire(function(err, con) {
      con.query('UPDATE Unfinished SET timestamp=? WHERE id=? AND user_id=?',
                [timestamp, entryId, userId], function(err, result) {
        con.release();
        if (err) {
          res.status(400).send({
            message: 'Updating Unfinished failed'
          });
        } else {
          res.status(200).send({
            message: 'Update ok'
          });
        }
      });
    });
  };

 /**
   * Remove a unfinished entry of the current user by its id
   */
  this.delete = function(res, userId, entryId) {
    connection.acquire(function(err, con) {
      con.query('DELETE FROM Unfinished WHERE user_id=? AND id=?', [userId, entryId], function(err, result) {
        con.release();
        if (err) {
          res.status(400).send({message: 'Unfinished deletion failed'});
        } else if (result.affectedRows === 0) {
          res.status(404).send({message: 'Unfinished not found'});
        } else {
          res.send({message: 'Unfinished deleted'});
        }
      });
    });
  };

}
module.exports = new Unfinished();
