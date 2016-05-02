// Title: CPSC-473-02 Graduate student project.
// Student Name: Dean Naji

// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
/*globals angular*/
function timeSince(date) {
    "use strict";
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

var myApp = angular.module("myApp", []);

//the controller:
myApp.controller("MyController", function($scope, $http) {
    "use strict";
    var order = "newest",
        userId,
        userPassword,
        userLikes = [],
        sessionUser = sessionStorage.getItem("username");
    console.log(sessionUser);
    if (sessionUser === null) {
        $scope.username = "";
        $("#logoutLink").hide();
        $("#userWelcome").hide();
        $("#loginLink").show();
        $(".submit-container").hide();
        $(".register-container").hide();
    } else if (sessionUser !== null) {
        $("#loginLink").hide();
        $("#userWelcome").show();
        $("#loginLink").hide();
        $(".submit-container").hide();
        $(".register-container").hide();
        $scope.username = sessionUser;
        userId = sessionStorage.getItem("userId");
        var csString = sessionStorage.getItem("userLikes");
        var x = csString.replace(/^,|,$/g, "");
        var stArray = x.split(",");
        console.log(stArray);
        for (var i = 0; i <= stArray.length - 1; i++) {
            userLikes[i] = parseInt(stArray[i]);
        }
        console.log(userLikes);
    }


    $http.get("http://localhost:3000/posts").success(function(data) {
        //the module:
        data.forEach(function(element) {
            var date = new Date(element.postDate);
            element.postDate = timeSince(date);
        });
        $scope.posts = data.reverse();
    });

    //operations:
    $scope.showNewest = function() {
        if (order === "oldest") {
            $scope.posts.reverse();
            order = "newest";
        }
    };

    $scope.showOldest = function() {
        if (order === "newest") {
            $scope.posts.reverse();
            order = "oldest";
        }
    };

    $scope.submitPost = function() {
        if ($scope.username !== "") {
            $(".submit-container").show();
            $(".menu-container").hide();
            $(".register-container").hide();
            $(".posts-container").hide();
        } else if ($scope.username === "") {
            $scope.loginArea();
        }
    };

    $scope.showHome = function() {
        $(".submit-container").hide();
        $(".register-container").hide();
        $(".menu-container").show();
        $(".posts-container").show();

    };

    $scope.submit = function() {
        var title = $("#link_title").val(),
            url = $("#main_link").val(),
            id = $scope.posts.length + 1,
            d = new Date(),
            date = d.toString();
        var likes = 0;
        console.log(date);
        var newPost = {
            "id": id,
            "link_title": title,
            "main_link": url,
            "username": $scope.username,
            "likes": likes,
            "postDate": date
        };
        $http({
            method: "POST",
            url: "http://localhost:3000/posts",
            data: newPost
        }).success(function(res) {
            console.log(res);
        });

        $("#link_title").val("");
        $("#main_link").val("");

        //push to the begining:
        $scope.posts.unshift(newPost);
        console.log($scope.posts);
        $scope.showHome();
    };


    $scope.likesUp = function(postID) {
        if ($scope.username !== "") {
            if (userLikes.indexOf(postID) < 0) {

                var main_link, link_title, id, username, likes, createdAt;
                console.log(postID);
                $scope.posts.forEach(function(element) {
                    if (element.id === postID) {
                        main_link = element.main_link;
                        link_title = element.link_title;
                        id = element.id;
                        username = element.username;
                        likes = element.likes;
                        createdAt = element.createdAt;
                        //increse the likes in the $scope.posts, this will show up on the view right away:
                        element.likes++;
                    }

                });
                userLikes.push(id);
                likes++;
                var url = "http://localhost:3000/posts/" + id;
                $http({
                    method: "PUT",
                    url: url,
                    data: {
                        "link_title": link_title,
                        "main_link": main_link,
                        "username": username,
                        "likes": likes,
                        "createdAt": createdAt
                    }

                }).success(function(res) {
                    console.log(res);
                });
                console.log(userId);
                var url2 = "http://localhost:3000/users/" + userId;
                $http({
                    method: "PUT",
                    url: url2,
                    data: {
                        "likes": userLikes,
                        "password": userPassword,
                        "username": $scope.username
                    }
                });
            }
        }
    };


    $scope.loginArea = function() {
        $(".posts-container").hide();
        $(".submit-container").hide();
        $(".menu-container").hide();
        $(".register-container").show();
    };


    $scope.register = function() {
        var user = $("#regUsername").val(),
            pass = $("#regPassword").val(),
            likedPosts = [];
        $scope.usersCount = 0;
        if ($("#regUsername").val() === "" && $("#regPassword").val() === "") {
            console.log("username/password boxes are empty!");
            return;
        } else if ($("#regUsername").val() !== "" && $("#regPassword").val() !== "") {
            $http({
                method: "GET",
                url: "http://localhost:3000/user",

            }).success(function(res) {
                if (res.length === 0) {
                    $scope.usersCount = 1;
                    $http({
                        method: "POST",
                        url: "http://localhost:3000/user",
                        data: {
                            "id": 1,
                            "usersCount": $scope.usersCount
                        }
                    });

                    $http({
                        method: "POST",
                        url: "http://localhost:3000/users",
                        data: {
                            "id": $scope.usersCount,
                            "username": user,
                            "password": pass,
                            "likes": likedPosts
                        }
                    }).success(function() {
                        alert("Welcome abord, now please log-in using your new username and password");
                    });

                } else if (res.length > 0) {
                    $http({
                        method: "GET",
                        url: "http://localhost:3000/user",
                    }).success(function(res) {
                        $scope.usersCount = res[0].usersCount;
                        $scope.usersCount++;
                        console.log($scope.usersCount);
                        $http({
                            method: "PUT",
                            url: "http://localhost:3000/user/1",
                            data: {
                                "usersCount": $scope.usersCount
                            }
                        });
                        $http({
                            method: "POST",
                            url: "http://localhost:3000/users",
                            data: {
                                "id": $scope.usersCount,
                                "username": user,
                                "password": pass,
                                "likes": likedPosts
                            }
                        }).success(function() {
                            alert("Welcome abord, now please log-in using your new username and password");
                        });
                    });

                }
            });
        }
        $("#regUsername").val("");
        $("#regPassword").val("");
    };


    $scope.login = function() {
        var user = $("#logUsername").val(),
            pass = $("#logPassword").val();
        if ($("#logUsername").val() === "" && $("#logPassword").val() === "") {
            console.log("username/password boxes are empty!");
            return;
        } else if ($("#logUsername").val() !== "" && $("#logPassword").val() !== "") {
            console.log("I got username/password valuse successfully..");
            $http({
                method: "GET",
                params: {
                    username: user,
                    password: pass
                },
                url: "http://localhost:3000/users",
            }).success(function(res) {
                if (res.length === 0) {
                    alert("Opps, invalid user name or password combination! If you don't have an account already, Please register..");
                    return;
                } else {
                    userId = res[0].id;
                    userPassword = res[0].password;
                    userLikes = res[0].likes;
                    $scope.username = user;
                    console.log(userLikes);
                    console.log(res);
                    sessionStorage.setItem("username", user);
                    sessionStorage.setItem("userLikes", userLikes);
                    sessionStorage.setItem("userId", userId);

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

    $scope.logout = function() {
        $("#logoutLink").hide();
        $("#userWelcome").hide();
        $("#loginLink").show();
        $scope.username = "";
        sessionStorage.clear();
    };

}); //end of Controller..
