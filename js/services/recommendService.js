(function(){
    'use strict';

    angular
    .module('app.services')
    .service('recommend', recommend);

    function recommend($firebaseArray, $state){
      function recommendSimple(){
        var eventRef = firebase.database().ref('events').orderByChild('finish').equalTo(false);
        var events = $firebaseArray(eventRef);
        events.$loaded().then(function(){
          var size = events.length;
          console.log(size);
        
          var n = Math.floor(Math.random()*size);
          console.log(n);
          console.log(events[n]);
          return $state.go('app.event', {'eventId' : events[n].$id} );
        })
      }

      var services =
      {
        recommendSimple: recommendSimple
      }
      return services;
    }

})();
