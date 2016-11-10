var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app');
var utils = require('./utils');

var should = chai.should();
chai.use(chaiHttp);

describe('Users', function() {

  var basePath = server.get('basePath');

  after(function (done){
    utils.removeTestUser();
    done();
  });


  it('should list ALL users on /users GET', function(done) {
    chai.request(server)
      .get(basePath + 'users')
      .set('x-access-token', server.get('testToken'))
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('username');
        res.body[0].should.have.property('email');
        done();
      });
  });

  it('should list a SINGLE user on /users/:id GET', function(done) {
    chai.request(server)
      .get(basePath + 'users/1')
      .set('x-access-token', server.get('testToken'))
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('username');
        res.body.should.have.property('email');
        done();
      });
    });

  it('should add a SINGLE user on /users POST');
  it('should update a SINGLE user on /users/:id PUT');
  it('should delete a SINGLE user on /users/:id DELETE');

});
