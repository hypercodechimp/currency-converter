var superagent = require('superagent');
var _ = require('underscore');

module.exports = function(Config, cb) {
  var url = 'http://openexchangerates.org/api/latest.json?app_id=' +
    Config.openExchangeRatesKey;

  // default rates incase get fails.
  var unitRates = {
    USD: 1,
    EUR: 0.84,
    GBP: 0.754,
    INR: 63.63
  };

  /**
   * Sends a ping to Open Exchange Rates and returns all exchange rates data.
   * @param {function}  callback  Callback to execute after a ping.
   */
  var ping = function(callback) {
    superagent.get(url, function(error, res) {

      if (error) {
        if (callback) callback(error);
        return;
      }

      var results;

      try {
        var results = JSON.parse(res.text);
        _.each(results.rates || {}, function(value, key) {
          unitRates[key] = value;
        });
        // Success, all iz well.
        if (callback) callback(null, unitRates);
      } catch (e) {
        // something went wrong with code.
        if (callback) callback(e);
      } // end of try - catch

    }); // end of superagent call.
  }; // end of ping.

  // call above function.
  ping(cb);

};
