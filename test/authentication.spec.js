var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app');
var should = chai.should();
var utils = require('./utils');

chai.use(chaiHttp);

describe('Authentication', function() {

  it('should provide token when logging in as a valid user', function (done){
    chai.request(server)
      .post('/arsu/login')
      .send(utils.testUser)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        // save access token for other test cases
        server.set('testToken', res.body.token);
        done();
      });
  });
});
