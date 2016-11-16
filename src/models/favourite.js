var connection = require('../connection');

function Favourite() {

  /**
   * Get favourites of the user
   */
  this.get = function(res, userId) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM Favourites WHERE user_id=?', userId, function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  /**
   * Create a new favourite
   */
  this.add = function(res, userId, item) {
    connection.acquire(function(err, con) {
      item['user_id'] = userId;
      con.query('INSERT INTO Favourites SET ?', item, function(err, result) {
        con.release();
        if (err) {
          res.status(400).send({
            message: 'Adding favourite failed'
          });
        } else {
          res.status(201).send({
            message: 'Favourite added',
            id: result.insertId
          });
        }
      });
    });
  };

 /**
   * Remove a favourite of the current user by its id
   */
  this.delete = function(res, userId, entryId) {
    connection.acquire(function(err, con) {
      con.query('DELETE FROM Favourites WHERE user_id=? AND id=?', [userId, entryId], function(err, result) {
        con.release();
        if (err) {
          res.status(400).send({message: 'Favourite deletion failed'});
        } else if (result.affectedRows === 0) {
          res.status(404).send({message: 'Favourite not found'});
        } else {
          res.send({message: 'Favourite deleted'});
        }
      });
    });
  };

}
module.exports = new Favourite();
