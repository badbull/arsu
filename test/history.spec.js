const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

const should = chai.should();
chai.use(chaiHttp);

describe('History', function() {

  const basePath = app.get('basePath');
  let addedEntryId;

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
        // Save id of the created item for other tests
        addedEntryId = res.body.id;
        done();
      });
  });

  it('should list ALL history entries by the CURRENT user on /history GET', function(done) {
    chai.request(app)
      .get(basePath + 'history')
      .set('x-access-token', app.get('testToken'))
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('podcast_id');
        res.body[0].podcast_id.should.equal(1);
        res.body[0].should.have.property('user_id');
        done();
      });
  });

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

});
