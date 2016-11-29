var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var config = require('./config');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// set root path for api (used in tests)
app.set('basePath', config.basePath);

connection.init();

// Routing
var authentication = require('./routes/authentication.routes');
var user = require('./routes/user.routes');
var playlist = require('./routes/playlist.routes');
var favourite = require('./routes/favourite.routes');
var history = require('./routes/history.routes');
var interest = require('./routes/interest.routes');
var unfinished = require('./routes/unfinished.routes');
app.use(config.basePath + 'login', authentication);
app.use(config.basePath + 'users', user);
app.use(config.basePath + 'playlists', playlist);
app.use(config.basePath + 'favourites', favourite);
app.use(config.basePath + 'history', history);
app.use(config.basePath + 'interests', interest);
app.use(config.basePath + 'unfinished', unfinished);

// Serve generated apidocs
app.use(config.basePath + 'docs', express.static(__dirname + '/../docs'));

var server = app.listen(config.serverPort, function() {
  console.log('Server listening on port ' + server.address().port);
});

// export needed for testing
module.exports = app;
