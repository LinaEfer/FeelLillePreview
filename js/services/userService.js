(function(){
    'use strict';

    angular
    .module('app.services')
    .service('user', user);

    function user(){
        return {login: function(username, password){
            return firebase.auth().createUserWithEmailAndPassword(username,password).catch(function(error) {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  console.log(errorMessage);
                });
            }
        }
    }

})();
