var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app');

var should = chai.should();
chai.use(chaiHttp);

describe('Favourites', function() {

  var basePath = server.get('basePath');

  // it('should list ALL favourites on /favourites GET');
  // it('should list a SINGLE favourite on /favourites/:id GET');
  // it('should list ALL favourites owned by specific user on /favourites/user/:id GET');
  it('should list ALL favourites owned by the current user on /favourites/user GET');
  it('should add a SINGLE favourite on /favourites POST');
  // it('should update a SINGLE favourite on /favourites/:id PUT');
  it('should delete a SINGLE favourite on /favourites/:id DELETE');

});
