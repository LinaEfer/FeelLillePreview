(function(){
  'use strict'

  angular
  .module('app.category', [])
  .controller('CategoryCtrl', CategoryCtrl)

  CategoryCtrl.$inject = ['$scope', 'events', 'categories'];

  function CategoryCtrl($scope, events, categories) {
    var allCategories = events.findCategories();
    console.log(allCategories);

    //var userid = firebase.auth().currentUser.uid;
    var userid = "km7nv5KYk8hUun9LAv2AJdcturk1";
    var userCat = categories.getUserCategories(userid);
    console.log(userCat);

    // créer tableau catégorie-event et catégorie-user
    $scope.categories = allCategories;
   	// allCategories.forEach(function(element){
   	// 	console.log(element.name);
   	// 	if (userCat.contains(element.name))
    // 		$scope.categories.push({name : element.name, checked : true});
    // 	else
    // 		$scope.categories.push({name : element.name, checked : false});
    // })

    //update tableau catégorie-user
    $scope.change = function(userid, cat){
    	categories.setUserCategories(userid, cat)
    };
  }

})();
