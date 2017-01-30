(function(){
    'use strict';

    angular
    .module('app.services')
    .service('events', events);


    function events($firebaseArray, $firebaseObject){

        /*
         * findAll service
         * find All Events
         *
         */
        function findAll(){
            var eventsRef = firebase.database().ref('events');
            console.log($firebaseArray(eventsRef));
            return $firebaseArray(eventsRef);
        }

        function findAllUnfinish(){
            var eventsRef = firebase.database().ref('events');
            return $firebaseArray(eventsRef.orderByChild('finish').equalTo(false));
        }

        function findOne(id){
          var eventRef = firebase.database().ref('events').child(id);
          //console.log(eventRef);
          return $firebaseObject(eventRef);
        }

        function findCategories(){
          var categoryRef = firebase.database().ref('categories');
          return $firebaseArray(categoryRef);
        }

        function findByCategories(categoryName){
          var eventsRef = firebase.database().ref('events');
          return $firebaseArray(eventsRef.orderByChild('category').equalTo(categoryName));
        }
        var services =
        {
            findAll: findAll,
            findAllUnfinish: findAllUnfinish,
            findOne: findOne,
            findCategories: findCategories,
            findByCategories: findByCategories

        }
        return services;
    }



})();
