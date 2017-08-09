/**
 * All API routes reside here.
 */
const routes = require('express').Router();

module.exports = function (wagner) {
  /**
   * Gets all exchange routes.
   */
  routes.get('/rates', wagner.invoke(function (fx, Config) {
    return function (req, res) {
      fx(Config, function (err, rates) {
        if (err) {
          res.json({ error : err });
        } else {
          res.json(rates);
        }
      });
    };
  }));

  return routes;
}
