(function(){
  'use strict'

  angular
  .module('app.controllers', ['app.home', 
                              'app.myevents', 
                              'app.event', 
                              'app.category',
                              'app.search'])
  .controller('AppCtrl', AppCtrl)
  .controller('NotificationCtrl', function($scope, $ionicPush){
    $ionicPush.register().then(function(t) {
      return $ionicPush.saveToken(t);
    })
    .then(function(t) {
      console.log('Token saved:', t.token);
      $scope.deviceToken = t.token;
    });
  })

  AppCtrl.$inject = ['userManager', 
                    '$scope', 
                    '$ionicModal', 
                    '$timeout', 
                    '$ionicPush', 
                    '$state',
                    'recommend'];

  function AppCtrl(userManager, $scope, $ionicModal, $timeout, $ionicPush, $state, recommend) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //handle push notif
  $scope.$on('cloud:push:notification', function(event, data) {
    var msg = data.message;
    alert(msg.title + ': ' + msg.text);
  });

  //Form switch
  $scope.switchLogin = true;

  // Form data for the login modal
  $scope.loginData = {};


  // Form data for the register modal
  $scope.registerData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doRegister = function() {
    console.log('Doing register', $scope.registerData);

    userManager
      .register($scope.registerData.email, $scope.registerData.password)
      .then($scope.isLogged = userManager.isLogged());
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  }; 

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    userManager
      .login($scope.loginData.email, $scope.loginData.password,1)
      .then($scope.isLogged = userManager.isLogged());
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  }; 

  $scope.loginWithGoogle = function(){
    console.log('Doing login Google');

    userManager
      .login('','',2)
      .then($scope.isLogged = userManager.isLogged());
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.loginWithFacebook = function(){
    console.log('Doing login Facebook');

    userManager
      .login('','',3)
      .then($scope.isLogged = userManager.isLogged());
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  // Connect Disconnect menu


  $scope.logout = function(){
    userManager
      .logout()
      .then($scope.isLogged = userManager.isLogged());
  }


  // Recommender
  $scope.recommend = function(){
    //var reco = recommend.recommendSimple();
    //$state.go('app.event', {'eventId' : reco.$id} );

    recommend.recommendSimple();
    
  }

  // Participe
  $scope.pEvents = [];
  // Favorite
  $scope.fEvents = [];

  // Retrieve the logged status
  $scope.isLogged = userManager.isLogged();

  console.log($scope.isLogged);

}







})();
