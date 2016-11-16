var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var connection = require('../connection');
var config = require('../config');

function Authentication() {
  /**
   * Send a response incl. valid token if correct username & password pair is submitted.
   */
  this.login = function(username, password, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM Users WHERE username = ?', username, function(err, result) {
        con.release();
        if (err) {
          res.status(500);
          res.send({message: 'Authentication failed', err: err.message});
        } else if (!result[0]){
          res.status(401);
          res.send({message: 'Authentication failed due bad username'});
        } else {
          var dbUser = result[0];
          bcrypt.compare(password, dbUser.password, function(err, success) {
            if (success) {
              delete dbUser.password; // No need to store the pw into token
              var token = jwt.sign(dbUser, config.tokenSecret, {
                expiresIn: config.tokenLifeTime
              });
              res.status('200');
              res.send({message: 'Logged in successfully', token: token});
            } else {
              res.status(401);
              res.send({message: 'Authentication failed due bad password'});
            }
          });
        }
      });
    });
  };

}

module.exports = new Authentication();
