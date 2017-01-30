(function(){
    'use strict';
    
    angular
    .module('app.services')
    .service('categories', categories);

    function categories($firebaseArray){

        function getUserCategories(userid){
            var userCatRef = firebase.database().ref('users/'+userid).child('categories');
            return $firebaseArray(userCatRef);
        }

        function setUserCategories(userid, categoriesArray){
            var userCatRef = firebase.database().ref('users').child(userid);
            usercatRef.child('categories').update(categoriesArray);
        }

        var services =
        {
            getUserCategories: getUserCategories,
            setUserCategories: setUserCategories
        }
        return services;
    }
    

    
})();