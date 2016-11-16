/**
 * App configuration
 */
const config = {
  serverPort: 8081,
  basePath: '/arsu/',
  tokenLifeTime: '365d',
  tokenSecret: 'topFckngSecret',
  database: {
    database: 'arsu',
    host: 'localhost',
    user: 'arsu',
    password: 'possuarsu'
  }
};
module.exports = config;
