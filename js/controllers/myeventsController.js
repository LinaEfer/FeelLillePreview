(function(){
  'use strict'

  angular
  .module('app.myevents', ["firebase"])
  .controller('MyEventsCtrl', MyEventsCtrl)

  MyEventsCtrl.$inject = ['participe', 'events','$scope','$firebaseArray'];

  function MyEventsCtrl(participe, events, $scope, $firebaseArray) {

    // button to switch between participate and favorite
    $scope.switchPF = false;

    var userid = firebase.auth().currentUser.uid;
    

    var pEventsId = participe.getEvents(userid);
    
    pEventsId.$loaded().then(function(a){
      a.forEach(function(el){
        if (el.participate)
          $scope.pEvents.push(events.findOne(el.event));
        if (el.favorite)
          $scope.fEvents.push(events.findOne(el.event));
      });
    });
    console.log($scope.pEvents);
    console.log($scope.fEvents);
  }

})();
