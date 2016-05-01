var myApp=angular.module("myApp", [])

//the controller:
myApp.controller("MyController", function($scope,$http){ 
     var order="newest",
         sessionUser= sessionStorage.getItem("username");
         console.log(sessionUser);
     if(sessionUser === null){
       $scope.username="";
       $("#logoutLink").hide();
       $("#userWelcome").hide();
       $("#loginLink").show();
       $(".submit-container").hide();
       $(".register-container").hide();
     } 
     else if (sessionUser !== null){
         $("#loginLink").hide();
         $("#userWelcome").show();
         $("#loginLink").hide();
         $(".submit-container").hide();
         $(".register-container").hide();
         $scope.username= sessionUser;
     }
     
     $http.get("http://localhost:3000/posts").success(function(data){
       //the module:
       data.forEach(function(element){
          var date = new Date(element.postDate); 
          element.postDate = timeSince(date);
       });
       $scope.posts=data.reverse();
     });
     
     //operations:
     $scope.showNewest = function(){
          if (order === "oldest"){
              $scope.posts.reverse();
              order="newest";
          }
     };

     $scope.showOldest = function(){
         if (order === "newest"){
            $scope.posts.reverse();
            order="oldest";
         }
     };

     $scope.submitPost = function(){
         if ($scope.username !== ""){
         $(".submit-container").show();
         $(".menu-container").hide();
         $(".register-container").hide();
         $(".posts-container").hide();
         }
         else if ($scope.username ===""){
           $scope.loginArea();
         }
     };

     $scope.showHome = function(){
         $(".submit-container").hide();
         $(".register-container").hide();
         $(".menu-container").show();
         $(".posts-container").show();
     
     };
     
     $scope.submit = function(){
          var title= $("#link_title").val(),
              url= $("#main_link").val(),
              id=$scope.posts.length +1,
              d = new Date(),
              date = d.toString();
              likes=0;
              console.log(date);              
              newPost={"id":id ,
                       "link_title":title ,
                       "main_link": url,
                       "username":$scope.username ,
                       "likes":likes,
                       "postDate":date};
           $http({
                   method: 'POST',
                   url: "http://localhost:3000/posts",
                   data: newPost
           }).success(function (res) {
             console.log(res);
           });

           $("#link_title").val("");
           $("#main_link").val("");
           
           //push to the begining:
           $scope.posts.unshift(newPost);
           console.log($scope.posts);
           $scope.showHome();
     };

     
     $scope.likesUp = function(postID){
       if($scope.username !==""){  
        console.log("click up!");
        var main_link,link_title,id,username,likes,createdAt;
        console.log(postID);
        $scope.posts.forEach(function(element){
            if(element.id === postID){
               main_link=element.main_link;
               link_title=element.link_title;
               id=element.id;
               username=element.username;
               likes=element.likes;
               createdAt=element.createdAt;
               //increse the likes in the $scope.posts, this will show up on the view right away:
               element.likes++;
            }
                 
        });
        var l=[];
        l.push(id);
        likes++; 
        var url ="http://localhost:3000/posts/"+id;
        $http({
                method: 'PUT',
                url: url ,
                data:{"link_title":link_title ,
                       "main_link": main_link, 
                       "username":username ,
                       "likes":likes, 
                       "createdAt":createdAt}

         }).success(function(res){
              console.log(res);
         });

        $http({
             method: 'PUT',
             params:{username: $scope.username},
             url: "http://localhost:3000/users/",
             data: {"likes": l, "password":"dean", "id":"5",
             "username": $scope.username}  
             });
       }
     };


     $scope.loginArea= function(){
       $(".posts-container").hide();
       $(".submit-container").hide();
       $(".menu-container").hide();
       $(".register-container").show();
     };


     $scope.register= function(){
       var user=$("#regUsername").val(),
           pass=$("#regPassword").val(),
           likedPosts=[];
       if ($("#regUsername").val()==="" && $("#regPassword").val()===""){
           console.log("username/password boxes are empty!");
           return;
       }
       else if($("#regUsername").val()!=="" && $("#regPassword").val()!==""){

           $http({
                    method: 'POST',
                    url: "http://localhost:3000/users",
                   data:{"username":user ,"password":pass, "likes":likedPosts}

                }).success(function (res) {
                     console.log(res);
                   });
       }
       $("#regUsername").val("");
       $("#regPassword").val("");
     };

     
     $scope.login= function(){
          var user = $("#logUsername").val(),
              pass = $("#logPassword").val();
          if ($("#logUsername").val()==="" && $("#logPassword").val()===""){
             console.log("username/password boxes are empty!");
             return;
          }
          else if($("#logUsername").val()!=="" && $("#logPassword").val()!==""){
          console.log("I got username/password valuse successfully..");
          $http({
                 method: 'GET',
                 params:{username: user, password: pass},
                 url: "http://localhost:3000/users" ,
               }).success(function (res) {
                    if(res.length === 0){
                        alert("Opps, invalid user name or password combination! If you don't have an account already, Please register.." );
                      return; 
                    }
                    else {
                        $scope.username=user;
                        sessionStorage.setItem("username",user);
                        $scope.showHome();
                        $("#logoutLink").show();
                        $("#userWelcome").show();
                        $("#loginLink").hide();
                        $("#logUsername").val("");
                        $("#logPassword").val("");
                    }
               });
          }
     };

     $scope.logout= function(){
         $("#logoutLink").hide();
         $("#userWelcome").hide();
         $("#loginLink").show();
         $scope.username="";
         sessionStorage.clear();
     };

});//end of Controller..

function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
}

