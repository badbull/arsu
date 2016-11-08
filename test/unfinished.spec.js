var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app');

var should = chai.should();
chai.use(chaiHttp);

describe('Unfinished', function() {

  var basePath = server.get('basePath');

  it('should list ALL unfinished items owned by the current user on /unfinished/user GET');
  it('should add a SINGLE unfinished item on /unfinished POST');
  it('should update a SINGLE unfinished on /unfinished/:id PUT');
  it('should delete a SINGLE unfinished on /unfinished/:id DELETE');

});
