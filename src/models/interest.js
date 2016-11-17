var connection = require('../connection');

function Interest() {

  /**
   * Get interests (tags) of the user
   */
  this.get = function(res, userId) {
    connection.acquire(function(err, con) {
      con.query('SELECT id, tags FROM Interests WHERE user_id=?', userId, function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  /**
   * Create a new interest
   */
  this.add = function(res, userId, item) {
    connection.acquire(function(err, con) {
      item.user_id = userId;
      con.query('INSERT INTO Interests SET ?', item, function(err, result) {
        con.release();
        if (err) {
          res.status(400).send({
            message: 'Adding interest failed'
          });
        } else {
          res.status(201).send({
            message: 'Interest added',
            id: result.insertId
          });
        }
      });
    });
  };

 /**
   * Remove an interest of the current user by its id
   */
  this.delete = function(res, userId, entryId) {
    connection.acquire(function(err, con) {
      con.query('DELETE FROM Interests WHERE user_id=? AND id=?', [userId, entryId], function(err, result) {
        con.release();
        if (err) {
          res.status(400).send({message: 'Interest deletion failed'});
        } else if (result.affectedRows === 0) {
          res.status(404).send({message: 'Interest not found'});
        } else {
          res.send({message: 'Interest deleted'});
        }
      });
    });
  };

}
module.exports = new Interest();
