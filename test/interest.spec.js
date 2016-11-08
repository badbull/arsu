var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app');

var should = chai.should();
chai.use(chaiHttp);

describe('Interests', function() {

  var basePath = server.get('basePath');

  it('should list ALL interests on /interests GET');
  it('should list a SINGLE interest on /interests/:id GET');
  it('should list ALL interests owned by specific user on /interests/user/:id GET');
  it('should list ALL interests owned by the current user on /interests/user GET');
  it('should add a SINGLE interest on /interests POST');
  it('should update a SINGLE interest on /interests/:id PUT');
  it('should delete a SINGLE interest on /interests/:id DELETE');

});
