var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/app');

var should = chai.should();
chai.use(chaiHttp);

describe('Unfinished', function() {

  var modelPath = app.get('basePath') + 'unfinished';
  var addedId;

  it('should add a SINGLE unfinished item on /unfinished POST', function(done) {
    chai.request(app)
      .post(modelPath)
      .set('x-access-token', app.get('testToken'))
      .send({
        podcast_id: 1,
        timestamp: 123
      })
      .end(function(err, res){
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('id');
        // Save id of the created item for other tests
        addedId = res.body.id;
        done();
      });
  });

  it('should update a SINGLE unfinished on /unfinished/:id PUT', function(done) {
    chai.request(app)
      .put(modelPath + '/' + addedId)
      .set('x-access-token', app.get('testToken'))
      .send({
        timestamp: 123456789
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should list ALL unfinished items owned by the CURRENT user on /unfinished GET', function(done) {
    chai.request(app)
      .get(modelPath)
      .set('x-access-token', app.get('testToken'))
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(addedId);
        res.body[0].should.have.property('podcast_id');
        res.body[0].podcast_id.should.equal(1);
        res.body[0].should.have.property('user_id');
        res.body[0].should.have.property('timestamp');
        res.body[0].timestamp.should.equal(123456789);
        done();
      });
  });

  it('should delete a SINGLE unfinished on /unfinished/:id DELETE', function(done) {
    chai.request(app)
      .delete(modelPath + '/' + addedId)
      .set('x-access-token', app.get('testToken'))
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
      });
   });

});
