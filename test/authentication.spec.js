var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/app');
var should = chai.should();
var utils = require('./utils');

chai.use(chaiHttp);

describe('Authentication', function() {

  var basePath = app.get('basePath');

  before(function (done) {
    utils.removeTestUser();
    utils.createTestUser();
    done();
  });

  it('should fail when trying to log in using INVALID password', function (done){
    chai.request(app)
      .post(basePath + 'login')
      .send({username: utils.testUser.username, password: '1234'})
      .end(function (err, res) {
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should provide token when logging in as a VALID user', function (done){
    chai.request(app)
      .post(basePath + 'login')
      .send(utils.testUser)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        // save access token for other test cases
        app.set('testToken', res.body.token);
        done();
      });
  });
});
