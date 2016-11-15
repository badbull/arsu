var jwt = require('jsonwebtoken');
var connection = require('../src/connection');
var config = require('../src/config');

var utils = {

  testUser: {
    username: 'testUser',
    password: 'testPass',
    is_admin: 1,
    email: "test@example.com"
  },

  getTestUserId: function(token) {
    return jwt.verify(token, config.tokenSecret).id;
  },

  createTestUser: function() {
    var user = this.testUser;
    connection.acquire(function(err, con) {
      con.query('insert into Users set ?', user, function(err, result) {
        con.release();
        if (err) {
         console.log('Test user creation failed');
        }
      });
    });
  },

  removeTestUser: function() {
    var username = this.testUser.username;
    connection.acquire(function(err, con) {
      con.query('delete from Users where username=?', username, function(err, result) {
        con.release();
        if (err) {
         console.log('Test user remove failed');
        } else {
         console.log('Test user removed');
        }
      });
    });
  }

};

module.exports = utils;
