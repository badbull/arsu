var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/app');
var utils = require('./utils');

var should = chai.should();
chai.use(chaiHttp);

describe('History', function() {

  var basePath = app.get('basePath');
  var addedEntryId;

  it('should add a SINGLE history entry on /history POST', function(done) {
    chai.request(app)
      .post(basePath + 'history')
      .set('x-access-token', app.get('testToken'))
      .send({
        podcast_id: 1
      })
      .end(function(err, res){
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('id');
        // Save id of the user created for other tests
        addedEntryId = res.body.id;
        done();
      });
  });

  it('should list ALL history entries by the CURRENT user on /history/user GET');

  it('should delete a SINGLE history entry of the CURRENT user on /history/:id DELETE', function(done) {
    chai.request(app)
      .delete(basePath + 'history/' + addedEntryId)
      .set('x-access-token', app.get('testToken'))
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
      });
    });

  // it('should list a SINGLE history entry on /history/:id GET');

});
