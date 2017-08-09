const fs = require('fs');

module.exports = function (wagner) {
  // fx
  wagner.factory('fx', function () {
    return require('./fx');
  });

  // Config
  wagner.factory('Config', function () {
    return JSON.parse(fs.readFileSync('./config.json').toString());
  });
};
