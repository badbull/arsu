var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/app');

var should = chai.should();
chai.use(chaiHttp);

describe('Favourites', function() {

  var modelPath = app.get('basePath') + 'favourites';
  var addedId;

  it('should add a SINGLE favourite on /favourites POST', function(done) {
    chai.request(app)
      .post(modelPath)
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
        // Save id of the created item for other tests
        addedId = res.body.id;
        done();
      });
  });

  it('should list ALL favourites owned by the CURRENT user on /favourites GET', function(done) {
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
        done();
      });
  });

  it('should delete a SINGLE favourite owned by the CURRENT on /favourites/:id DELETE', function(done) {
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
