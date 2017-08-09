(function () {

  let app = angular.module("currencyConverter", [ 'ng' ]);

  // factory for getting exchange rates from the backend.
  app.factory('ExchangeRates', [ '$http', '$q', function($http, $q) {
    let defer = $q.defer();

    $http
      .get('/api/v1/rates')
      .then(function (res) {

        if (res.status === 200) {
          let standardRates = {};
          console.log(res.data);
          standardRates["USD"] = res.data.USD;
          standardRates["EUR"] = res.data.EUR;
          standardRates["GBP"] = res.data.GBP;
          console.log(standardRates["GBP"]);
          standardRates["INR"] = res.data.INR;

          defer.resolve(standardRates);
        } else {
          let error = { "error" : "Server replied with " + res.status };
          defer.reject(error);
        }

      });

      return defer.promise;
  }]);

  app.controller('displayRates', ['$scope', 'ExchangeRates', function ($scope, ExchangeRates) {
      $scope.footer = "Web application written by Rj.";
      $scope.finalValues = {};
      // to use in short form inside the controller.
      let acceptedCurrencies = ["USD", "EUR", "GBP", "INR"];
      $scope.acceptedCurrencies = acceptedCurrencies;

      // get ExchangeRates or catch an error.
      ExchangeRates
        .then(function(rates) {
          $scope.rates = rates;
          // defaults.
          $scope.finalValues["USD"] = rates.USD;
          $scope.finalValues["EUR"] = rates.EUR;
          $scope.finalValues["GBP"] = rates.GBP;
          $scope.finalValues["INR"] = rates.INR;
        }).catch(function (err) {
          $scope.error = err;
        });

      /**
       * Updates all currencies.
       */
     $scope.calculate = function (currency, value) {
       if (! currency in acceptedCurrencies) {
         $scope.error = "Invalid currency!";
       }

       for (var currencyName in $scope.rates) {
         $scope.finalValues[currencyName]
          = (value * $scope.rates[currencyName] / $scope.rates[currency]);
       }
     };   

  }]);

})();
