var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app');

var should = chai.should();
chai.use(chaiHttp);

describe('History', function() {

  var basePath = server.get('basePath');

  // it('should list a SINGLE history entry on /history/:id GET');
  it('should list ALL history entries by the current user on /history/user GET');
  it('should add a SINGLE history entry on /history POST');
  // it('should delete a SINGLE history entry on /history/:id DELETE');

});
