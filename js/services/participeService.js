(function(){
    'use strict';
    
    angular
    .module('app.services')
    .service('participe', participe);

    function participe($firebaseArray, $firebaseObject){

        function exists(userid, eventid){
            var participeRef = firebase.database().ref('EventUser').orderByChild('userevent').equalTo(userid+eventid);
            participeRef.once('value').then(function(snap){
                var data = snap.val();
                if (data != null)
                    return true
                else
                    return false
            });
        }

        function setEvent(userid,eventid){
            var participeRef = firebase.database().ref('EventUser');
            var element = 
                {
                    userevent: userid+eventid,
                    user: userid,
                    event: eventid,
                    participate: true
                }
            var newParticipation = participeRef.child(userid+eventid);
            newParticipation.update(element);
            console.log('created');
        }

        function getEvents(userid){
            var participeRef = firebase.database().ref('EventUser').orderByChild('user').equalTo(userid);
            return $firebaseArray(participeRef);
        }

        function getUsers(eventid){
            var participeRef = firebase.database().ref('EventUser').orderByChild('event').equalTo(eventid);
            return $firebaseArray(participeRef);
        }

        function getUsersNumber(eventid){
            var participeRef = firebase.database().ref('EventUser').orderByChild('event').equalTo(eventid);
            participeRef.once("value").then(function(snap){
                return snap.numChildren();
            })
            // var arr = $firebaseArray(participeRef);
            // arr.$loaded().then(function(a){
            //     return a.length;
            // });
        }

        function setFav(userid,eventid){
            var participeRef = firebase.database().ref('EventUser');
            var element = 
                {
                    userevent: userid+eventid,
                    user: userid,
                    event: eventid,
                    favorite: true
                }
            var newParticipation = participeRef.child(userid+eventid);
            newParticipation.update(element);
            console.log('created fav');
        }

        var services =
        {
            exists: exists,
            setEvent: setEvent,
            getEvents: getEvents,
            getUsers: getUsers,
            getUsersNumber: getUsersNumber,
            setFav: setFav
        }
        return services;
    }
    

    
})();