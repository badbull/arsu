var connection = require('../connection');
var bcrypt = require('bcrypt');

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
    // Admin flag cannot be set through this api for now
    if (user.is_admin) delete user.is_admin;
    bcrypt.hash(user.password, 10, function(hashErr, hash) {
      user.password = hash;
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
    });
  };

  this.edit = function(res, userId, user) {
    connection.acquire(function(err, con) {
      con.query('update Users set ? where id=?', [user, userId], function(err, result) {
        con.release();
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

  /**
   * Remove a user by id (only if current user is admin)
   */
  this.deleteById = function(res, currentUser, userId) {
    if (!currentUser.is_admin) {
      return res.status(403).send({message: 'No rights to delete user'});
    }
    connection.acquire(function(err, con) {
      con.query('DELETE FROM Users WHERE id=?', userId, function(err, result) {
        con.release();
        if (err) {
          res.status(400).send({message: 'User deletion failed'});
        } else if (result.affectedRows === 0) {
          res.status(404).send({message: 'User not found'});
        } else {
          res.send({message: 'User deleted'});
        }
      });
    });
  };

}

module.exports = new User();
