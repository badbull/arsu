var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app');
var utils = require('./utils');

var should = chai.should();
chai.use(chaiHttp);

describe('History', function() {

  var basePath = server.get('basePath');

  it('should add a SINGLE history entry on /history POST', function(done) {
    chai.request(server)
      .post(basePath + 'history')
      .set('x-access-token', server.get('testToken'))
      .send({
        episode_id: 1,
        serie_id: 1
      })
      .end(function(err, res){
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should list ALL history entries by the current user on /history/user GET');

  // it('should list a SINGLE history entry on /history/:id GET');
  // it('should delete a SINGLE history entry on /history/:id DELETE');

});
