/**
 * All angular-js routes reside here.
 */
const routes  = require('express').Router();
const path    = require('path');

module.exports = function (wagner) {
  /**
   * Main angular app.
   */
  routes.get('/',function (req, res) {
    filepath = path.join(path.dirname(__filename), 'public/app/index.html');
    res.sendFile(filepath);
  });

  return routes;
};
