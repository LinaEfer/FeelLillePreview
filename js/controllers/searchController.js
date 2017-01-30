(function(){
  'use strict'

  angular
  .module('app.search', ["firebase"])
  .controller('SearchCtrl', SearchCtrl)

  SearchCtrl.$inject = ['events',
                      '$scope',
                      '$firebaseArray'];

  function SearchCtrl(events, $scope, $firebaseArray) {

    $scope.allEvents = events.findAll();

    $scope.allSearch;
  }

})();
