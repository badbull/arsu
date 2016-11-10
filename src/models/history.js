var connection = require('../connection');

function History() {

  /**
   * Get history of the user
   */
  this.getEntries = function(res, userId) {
    connection.acquire(function(err, con) {
      con.query('select * from History where user_id=?', userId, function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  /**
   * Create a new history entry
   */
  this.addEntry = function(res, userId, entry) {
    connection.acquire(function(err, con) {
      entry['user_id'] = userId;
      con.query('insert into History set ?', entry, function(err, result) {
        con.release();
        if (err) {
         res.status(400).send({message: 'Adding history failed'});
        } else {
         res.status(201).send({message: 'History entry added'});
        }
      });
    });
  };

}
module.exports = new History();
