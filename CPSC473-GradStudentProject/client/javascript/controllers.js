var myApp=angular.module("myApp", [])//sq. brackets are for the dependancies, which we don't need by now
console.log("welcome to the controller");
//the controller:
myApp.controller("MyController", function($scope,$http){
    //$scope.posts={
    //    "link_title": "title1: a test title!",
    //    "main_link" : "www.google.com"
    //}
    $http.get("http://localhost:3000/posts").success(function(data){
       //the module:
       $scope.posts=data;
    });
});
