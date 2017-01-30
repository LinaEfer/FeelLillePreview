(function(){
    'use strict';

    angular
    .module('app.services')
    .service('userManager', userManager);

    userManager.$inject = ['$ionicPopup','$firebaseAuth'];
    function userManager($ionicPopup, $firebaseAuth){
        var auth = $firebaseAuth();
        /*
         * login service
         * type : 1 = mail/pass; 2 = facebook; 3 = google
         *
         */
        function login(email, pass, type){
          if (type == 1){
                return auth.$signInWithEmailAndPassword(email, pass)
                    .catch(function(err)
                    {
                        console.log(err.message);
                        $ionicPopup.alert(
                            {
                                title : "Error login",
                                template : err.message
                            });
                    }
                )
             }

          if (type == 2) {
              var provider = new firebase.auth.GoogleAuthProvider();
              return auth.$signInWithPopup(provider)
                 .catch(function(err)
                   {
                       console.log(err.message);
                       $ionicPopup.alert(
                         {
                             title : "Error login",
                             template : err.message
                         });
                   });
              }

          if (type == 3) {
              var provider = new firebase.auth.FacebookAuthProvider();
              return auth.$signInWithPopup(provider)
                 .catch(function(err)
                   {
                       console.log(err.message);
                       $ionicPopup.alert(
                         {
                             title : "Error login",
                             template : err.message
                         });
                   });
            }
         }

        /*logout service*/
        function logout(){
            return auth.$signOut();
        }

        /*check logged in service*/
        function isLogged(){
            return auth.$getAuth();
        }

        /* register service*/
        function register(email, pass){
          return auth.$createUserWithEmailAndPassword(email, pass)
                    .catch(function(err)
                    {
                        console.log(err.message);
                        $ionicPopup.alert(
                            {
                                title : "Error register",
                                template : err.message
                            });
                    })
                    .then(function(d){
                      console.log(d);
                      firebase.database().ref('users').child(d.uid).set({email:d.email, categories : []});
                    })
        }


        /* update service */

        var services =
        {
            login: login,
            register: register,
            logout: logout,
            isLogged: isLogged
        }
        return services;
    }

})();
