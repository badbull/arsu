var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var routes = require('./routes');
var config = require('./config');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// set root path for api
app.set('basePath', config.basePath);

connection.init();
routes.configure(app);

var server = app.listen(config.serverPort, function() {
  console.log('Server listening on port ' + server.address().port);
});

// export needed for testing
module.exports = app;
