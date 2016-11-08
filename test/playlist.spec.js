var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app');

var should = chai.should();
chai.use(chaiHttp);

describe('Playlists', function() {

  var basePath = server.get('basePath');

  before(function (done) {
    //TODO: delete all playlists by testuser and add a sample (in utils.js?)
    done();
  });

  it('should list ALL playlists on /playlists GET', function(done) {
    chai.request(server)
      .get(basePath + 'playlists')
      .set('x-access-token', server.get('testToken'))
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

  it('should list ALL playlists owned by current user on /playlists/user GET', function(done) {
    chai.request(server)
      .get(basePath + 'playlists/user')
      .set('x-access-token', server.get('testToken'))
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

  it('should list ALL playlists owned by specific user on /playlists/user/:id GET', function(done) {
    chai.request(server)
      .get(basePath + 'playlists/user/1')
      .set('x-access-token', server.get('testToken'))
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('playlist_name');
        res.body[0].should.have.property('user_id');
        res.body[0].user_id.should.equal(1);
        done();
      });
  });

  it('should list a SINGLE playlist incl. content on /playlists/:id GET', function(done) {
    chai.request(server)
      .get(basePath + 'playlists/2')
      .set('x-access-token', server.get('testToken'))
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('playlist_id');
        res.body.should.have.property('playlist_name');
        res.body.should.have.property('user_id');
        res.body.user_id.should.equal(1);
        res.body.should.have.property('content');
        res.body.content.should.be.a('array');
        res.body.content[0].should.be.a('object');
        res.body.content[0].should.have.property('episode_id');
        res.body.content[0].should.have.property('serie_id');
        done();
      });
  });

  it('should add a SINGLE playlist on /playlists POST');
  it('should update a SINGLE playlist on /playlists/:id PUT');
  it('should delete a SINGLE playlist and ALL content on /playlists/:id DELETE');

});
