(function(){
  'use strict'

  angular
  .module('app.event', [])
  .controller('EventCtrl', EventCtrl)

  EventCtrl.$inject = ['$scope', '$stateParams', 'events', 'participe', '$firebaseObject', '$ionicPopup'];

  function EventCtrl($scope, $stateParams, events, participe, $ionicPopup) {
    var id = $stateParams.eventId;

    $scope.event = events.findOne(id);

    
    // get participation for this event
    $scope.pNumber = 0;
    var n = participe.getUsers(id);
    n.$loaded().then(function(a){
      a.forEach(function(el){
        $scope.pNumber += 1;
      });
    });

    $scope.participate = function(){
      if (firebase.auth().currentUser != null){
        var userid = firebase.auth().currentUser.uid;
        participe.setEvent(userid, id);
        $scope.pEvents.push(events.findOne(id));
      }
      else {
        $ionicPopup.alert({
         title: 'Please login',
         template: 'You need to be logged in to participate in this event'
        });
      }
    }

    $scope.favorite = function(){
      if (firebase.auth().currentUser != null){
        var userid = firebase.auth().currentUser.uid;
        participe.setFav(userid, id);
        $scope.fEvents.push(events.findOne(id));
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
