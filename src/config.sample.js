/**
 * App configuration
 */
const config = {
  serverPort: 8088,
  basePath: '/arsu/',
  tokenLifeTime: '2h',
  tokenSecret: 'myTopFckngSecretString',
  database: {
    database: 'arsu',
    host: 'localhost',
    user: '<DB_USER>',
    password: '<DB_PASSWORD>'
  }
};
module.exports = config;
