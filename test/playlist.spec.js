const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const utils = require('./utils');

const should = chai.should();
chai.use(chaiHttp);

describe('Playlists', function() {

  const modelPath = app.get('basePath') + 'playlists';

  let testPlaylistId;
  let testUserId;

  before(function (done) {
    // use testToken to resolve user's id
    testUserId = utils.getTestUserId(app.get('testToken'));
    done();
  });

  after(function (done){
    done();
  });

  it('should add a SINGLE playlist on /playlists POST', function(done) {
    chai.request(app)
      .post(modelPath)
      .set('x-access-token', app.get('testToken'))
      .send({
        playlist_name: "Test playlist"
      })
      .end(function(err, res){
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('id');
        // Save id of the playlist created for other tests
        testPlaylistId = res.body.id;
        done();
      });
  });

  it('should list ALL playlists on /playlists GET', function(done) {
    chai.request(app)
      .get(modelPath)
      .set('x-access-token', app.get('testToken'))
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('playlist_name');
        res.body[0].should.have.property('user_id');
        done();
      });
  });

  it('should list ALL playlists owned by CURRENT user on /playlists/user GET', function(done) {
    chai.request(app)
      .get(modelPath + '/user')
      .set('x-access-token', app.get('testToken'))
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('playlist_name');
        res.body[0].should.have.property('user_id');
        done();
      });
  });

  it('should list ALL playlists owned by a specific user on /playlists/user/:id GET', function(done) {
    chai.request(app)
      .get(modelPath + '/user/' + testUserId)
      .set('x-access-token', app.get('testToken'))
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('playlist_name');
        res.body[0].should.have.property('user_id');
        res.body[0].user_id.should.equal(testUserId);
        res.body[0].playlist_name.should.equal("Test playlist");
        done();
      });
  });

  it('should update (add content to) a SINGLE playlist on /playlists/:id PUT', function(done) {
    chai.request(app)
      .put(modelPath + '/' + testPlaylistId)
      .set('x-access-token', app.get('testToken'))
      .send({
        podcast_id: 1
      })
      .end(function(err, res){
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should list ALL playlists on /playlists GET', function(done) {
    chai.request(app)
      .get(modelPath)
      .set('x-access-token', app.get('testToken'))
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('playlist_name');
        res.body[0].should.have.property('user_id');
        done();
      });
  });

  it('should list a SINGLE playlist incl. content on /playlists/:id GET', function(done) {
    chai.request(app)
      .get(modelPath + '/' + testPlaylistId)
      .set('x-access-token', app.get('testToken'))
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('playlist_id');
        res.body.should.have.property('playlist_name');
        res.body.should.have.property('user_id');
        res.body.user_id.should.equal(testUserId);
        res.body.should.have.property('content');
        res.body.content.should.be.a('array');
        res.body.content[0].should.be.a('object');
        res.body.content[0].should.have.property('podcast_id');
        res.body.content[0].podcast_id.should.equal(1);
        done();
      });
  });

  it('should delete a SINGLE playlist and ALL content on /playlists/:id DELETE', function(done) {
    chai.request(app)
      .delete(modelPath + '/' + testPlaylistId)
      .set('x-access-token', app.get('testToken'))
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
      });
    });

});
