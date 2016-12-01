const express = require('express');
const bodyparser = require('body-parser');
const connection = require('./connection');
const config = require('./config');

const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// set root path for api (used in tests)
app.set('basePath', config.basePath);

connection.init();

// Routing
const authentication = require('./routes/authentication.routes');
const user = require('./routes/user.routes');
const playlist = require('./routes/playlist.routes');
const favourite = require('./routes/favourite.routes');
const history = require('./routes/history.routes');
const interest = require('./routes/interest.routes');
const unfinished = require('./routes/unfinished.routes');
app.use(config.basePath + 'login', authentication);
app.use(config.basePath + 'users', user);
app.use(config.basePath + 'playlists', playlist);
app.use(config.basePath + 'favourites', favourite);
app.use(config.basePath + 'history', history);
app.use(config.basePath + 'interests', interest);
app.use(config.basePath + 'unfinished', unfinished);

// Serve generated apidocs
app.use(config.basePath + 'docs', express.static(__dirname + '/../docs'));

const server = app.listen(config.serverPort, function() {
  console.log('Server listening on port ' + server.address().port);
});

// export needed for testing
module.exports = app;
