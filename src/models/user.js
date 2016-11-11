var connection = require('../connection');

function User() {
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select id, username, email from Users', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.getById = function(res, userId) {
    connection.acquire(function(err, con) {
      con.query('select id, username, email from Users where id=?', userId, function(err, result) {
        con.release();
        if (!result[0]) {
          res.status(404).send({message: 'User not found'});
        } else {
          res.send(result[0]);
        }
      });
    });
  };

  this.create = function(res, user) {
    connection.acquire(function(err, con) {
      con.query('insert into Users set ?', user, function(err, result) {
        con.release();
        if (err) {
         res.status(400).send({message: 'User creation failed'});
        } else {
         res.status(201).send({
           message: 'User created successfully',
           id: result.insertId
          });
        }
      });
    });
  };

  this.edit = function(res, userId, user) {
    connection.acquire(function(err, con) {
      con.query('update Users set ? where id=?', [user, userId], function(err, result) {
        con.release();
      console.log(result);
        if (err) {
         res.status(400).send({message: 'User data update failed'});
        } else {
         res.status(200).send({
           message: (result.affectedRows > 0) ? 'User data updated' : 'Nothing changed'
          });
        }
      });
    });
  };


}

module.exports = new User();
