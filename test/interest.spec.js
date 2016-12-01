const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

const should = chai.should();
chai.use(chaiHttp);

describe('Interests', function() {

  const modelPath = app.get('basePath') + 'interests';
  let addedId;

  it('should add a SINGLE interest on /interests POST', function(done) {
    chai.request(app)
      .post(modelPath)
      .set('x-access-token', app.get('testToken'))
      .send({
        tags: 'example tag'
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

  it('should list ALL interests owned by the CURRENT user on /interests GET', function(done) {
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
        res.body[0].should.have.property('tags');
        res.body[0].tags.should.equal('example tag');
        done();
      });
  });

  it('should delete a SINGLE interest owned by the CURRENT user on /interests/:id DELETE', function(done) {
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

// ? TODO: ?
//  it('should list ALL interests on /interests GET');
//  it('should list ALL interests owned by a SPECIFIC user on /interests/user/:id GET');
//  it('should update a SINGLE interest owned by the CURRENT user on /interests/:id PUT');
});
