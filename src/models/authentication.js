var jwt = require('jsonwebtoken');
var connection = require('../connection');
var config = require('../config');

function Authentication() {

  /**
   * Send a response incl. valid token if correct username & password pair is submitted.
   */
  this.login = function(username, password, res) {
    connection.acquire(function(err, con) {
      con.query('select * from Users where username = ?', username, function(err, result) {
        con.release();
        if (err) {
          res.status(500);
          res.send({message: 'Authentication failed', err: err.message});
        } else {
          var user = result[0];
          if (password === user.password) {
            var token = jwt.sign(user, config.tokenSecret, {
              expiresIn: config.tokenLifeTime
            });
            res.status('200');
            res.send({message: 'Logged in successfully', token: token});
          } else {
            res.status('401');
            res.send({message: 'Authentication failed due bad username/password'});
          }
        }
      });
    });
  };

}

module.exports = new Authentication();
