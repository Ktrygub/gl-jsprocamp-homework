const path = require('path');

module.exports = {
  rootDir: path.join(process.cwd(), './'),
  collectCoverage: true,
  verbose: true,
  roots: ['__mytests__', '__test__'],
};
