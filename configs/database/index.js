let config;

switch (process.env.DATABASE) {
  case 'postgres':
    config = require('./postgres');
    break;
  default:
    config = require('./mysql');
}

module.exports = config;
