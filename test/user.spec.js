var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/app');
var utils = require('./utils');

var should = chai.should();
chai.use(chaiHttp);

describe('Users', function() {

  var basePath = app.get('basePath');
  var addedUserId;

  after(function (done){
    utils.removeTestUser();
    done();
  });

  it('should add a SINGLE user on /users POST', function(done) {
    chai.request(app)
      .post(basePath + 'users')
      .set('x-access-token', app.get('testToken'))
      .send({
        username: "johnd",
        password: "passTest123",
        email: "john.doe@example.com"
      })
      .end(function(err, res){
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('id');
        // Save id of the user created for other tests
        addedUserId = res.body.id;
        done();
      });
  });

  it('should update a SINGLE user on /users/:id PUT', function(done) {
    chai.request(app)
      .put(basePath + 'users')
      .set('x-access-token', app.get('testToken'))
      .send({
        username: "johnd",
        password: "passTest123",
        email: "john@example.com"
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('User data updated');
        done();
      });
  });

  it('should list ALL users on /users GET', function(done) {
    chai.request(app)
      .get(basePath + 'users')
      .set('x-access-token', app.get('testToken'))
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
    chai.request(app)
      .get(basePath + 'users/' + addedUserId)
      .set('x-access-token', app.get('testToken'))
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('username');
        res.body.username.should.equal('johnd');
        res.body.should.have.property('email');
        res.body.email.should.equal('john@example.com');
        done();
      });
    });

  it('should delete a SINGLE user on /users/:id DELETE');

});
