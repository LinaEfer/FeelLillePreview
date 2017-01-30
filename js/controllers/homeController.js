(function(){
  'use strict'

  angular
  .module('app.home', ["firebase"])
  .controller('HomeCtrl', HomeCtrl)

  HomeCtrl.$inject = ['events', 
                      'participe', 
                      '$scope',
                      '$firebaseArray', 
                      '$ionicPopup'];

  function HomeCtrl(events, participe, $scope, $firebaseArray, $ionicPopup) {

    $scope.events = events.findAllUnfinish();
    console.log($scope.events);

    $scope.sortDate = function(event) {

      var date = event.dateBegin.split(' ');
      var month = "";
      if (date[1] == "janvier")
        month = "0";
      if (date[1] == "février")
        month = "1";
      if (date[1] == "mars")
        month = "2";
      if (date[1] == "avril")
        month = "3";
      if (date[1] == "mai")
        month = "4";
      if (date[1] == "juin")
        month = "5";
      if (date[1] == "juillet")
        month = "6";
      if (date[1] == "août")
        month = "7";
      if (date[1] == "septembre")
        month = "8";
      if (date[1] == "octobre")
        month = "9";
      if (date[1] == "novembre")
        month = "10";
      if (date[1] == "décembre")
        month = "11";
      var date2 = new Date(date[2], month, date[0], date[3].split(':')[0], date[3].split(':')[1]);
      console.log(date2)
      return date2;
    };
    $scope.search;

    $scope.participate = function(eventid){
      if (firebase.auth().currentUser != null){
        var userid = firebase.auth().currentUser.uid;
        participe.setEvent(userid, eventid);
        $scope.pEvents.push(events.findOne(eventid));
      }
      else {
        $ionicPopup.alert({
         title: 'Please login',
         template: 'You need to be logged in to participate in this event'
        });
      }
    }

    $scope.favorite = function(eventid){
      if (firebase.auth().currentUser != null){
        var userid = firebase.auth().currentUser.uid;
        participe.setFav(userid, eventid);
        $scope.fEvents.push(events.findOne(eventid));
      }
      else {
        $ionicPopup.alert({
         title: 'Please login',
         template: 'You need to be logged in to favorite this event'
        });
      }
      
    }
  }

})();
