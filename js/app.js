(function(){
  'use strict'

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.controllers' is found in controllers.js
  angular
  .module('app', ['ionic', 'ionic.cloud', 'ionic-material', 'app.controllers', 'app.services'])
  .run(run)
  .config(config)

  function run($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  }
  function config($stateProvider, $urlRouterProvider,$ionicCloudProvider) {

  //Firebase
  var configg = {
    apiKey: "AIzaSyAI3yQjxN2_mh1YVzDADjglTFqm0Wz2A1o",
    authDomain: "fir-feellille.firebaseapp.com",
    databaseURL: "https://fir-feellille.firebaseio.com",
    storageBucket: "firebase-feellille.appspot.com",
    messagingSenderId: "589802431509"
  };
  firebase.initializeApp(configg);

  //ionicCloud
  $ionicCloudProvider
  .init({
    "core" : {
      "app_id" :"ec78ca3e"
    },
    "push": {
      "sender_id": "589802431509",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.myevents', {
    url: '/myevents',
    views: {
      'menuContent': {
        templateUrl: 'templates/myevents.html',
        controller: 'MyEventsCtrl'
      }
    }
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('app.notification', {
      url: '/notification',
      views: {
        'menuContent': {
          templateUrl: 'templates/notification.html',
          controller: 'NotificationCtrl'
        }
      }
    })

  .state('app.category', {
      url: '/category',
      views: {
        'menuContent': {
          templateUrl: 'templates/category.html',
          controller: 'CategoryCtrl'
        }
      }
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

  .state('app.event', {
    url: '/home/event/:eventId',
    views: {
      'menuContent': {
        templateUrl: 'templates/event.html',
        controller: 'EventCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
}
})();
