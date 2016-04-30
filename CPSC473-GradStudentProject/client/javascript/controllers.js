1 var myApp=angular.module("myApp", [])
2 //sq. brackets are for the dependancies, which we don't need by now
3 console.log("welcome to the controller");
4
5 //the controller:
6 myApp.controller("MyController", function($scope,$http){
7      var order="newest";
8      $scope.username="";
9
10      $("#logoutLink").hide();
11      $("#userWelcome").hide();
12      $("#loginLink").show();
13      $(".submit-container").hide();
14      $(".register-container").hide();
15      $http.get("http://localhost:3000/posts").success(function(data){
16        //the module:
17        $scope.posts=data.reverse();
18        console.log(data.length);
19        console.log($scope.posts);
20      });
21
22      //operations:
23      $scope.showNewest = function(){
24           if (order === "oldest"){
25               $scope.posts.reverse();
26               order="newest";
27               //console.log(order);
28           }
29      };
30
31      $scope.showOldest = function(){
32          if (order === "newest"){
33             $scope.posts.reverse();
34             order="oldest";
35             //console.log(order);
36          }
37      };
38
39      $scope.submitPost = function(){
40          if ($scope.username !== ""){
  41          $(".submit-container").show();
  42          $(".menu-container").hide();
  43          $(".register-container").hide();
  44          $(".posts-container").hide();
  45          }
  46          else if ($scope.username ===""){
  47            $scope.loginArea();
  48          }
  49      };
  50
  51      $scope.showHome = function(){
  52          $(".submit-container").hide();
  53          $(".register-container").hide();
  54          $(".menu-container").show();
  55          $(".posts-container").show();
  56
  57      };
  58
  59      $scope.submit = function(){
  60           var title= $("#link_title").val(),
  61               url= $("#main_link").val(),
  62               id=$scope.posts.length +1,
  63               likes=0;
  64            $http({
  65                    method: 'POST',
  66                    url: "http://localhost:3000/posts",
  67
  68                    //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  69                    //headers: {'Content-Type': 'application/json'},
  70
  71                   data:{"id":id ,"link_title":title ,"main_link": url, "username":"dean" ,"likes":likes}
  72
  73            }).success(function (res) {
  74              console.log(res);
  75              //$scope.posts.$digest();
  76            });
  77
  78      };
  80
   81      $scope.likesUp = function(postID){
   82         console.log("click up!");
   83         var main_link,link_title,id,username,likes,createdAt;
   84         console.log(postID);
   85         $scope.posts.forEach(function(element){
   86             if(element.id === postID){
   87                main_link=element.main_link;
   88                link_title=element.link_title;
   89                id=element.id;
   90                username=element.username;
   91                likes=element.likes;
   92                createdAt=element.createdAt;
   93             }
   94
   95         });
   96         likes++;
   97         var url ="http://localhost:3000/posts/"+id;
   98         $http({
   99                 method: 'PUT',
  100                 url: url ,
  101                 data:{"link_title":link_title ,
  102                        "main_link": main_link,
  103                        "username":username ,
  104                        "likes":likes,
  105                        "createdAt":createdAt}
  106
  107          }).success(function (res) {
  108               console.log(res);
  109               //console.log($scope.posts.likes);
  110               //$scope.$apply();
  111          });
  112      };
  113
  114      $scope.loginArea= function(){
  115        $(".posts-container").hide();
  116        $(".submit-container").hide();
  117        $(".menu-container").hide();
  118        $(".register-container").show();
  119      };

  $scope.register= function(){
123        var user=$("#regUsername").val(),
124            pass=$("#regPassword").val();
125        if ($("#regUsername").val()==="" && $("#regPassword").val()===""){
126            console.log("username/password boxes are empty!");
127            return;
128        }
129        else if($("#regUsername").val()!=="" && $("#regPassword").val()!==""){
130
131            $http({
132                     method: 'POST',
133                     url: "http://localhost:3000/users",
134                    data:{"username":user ,"password":pass}
135
136                 }).success(function (res) {
137                      console.log(res);
138                    });
139        }
140        $("#regUsername").val("");
141        $("#regPassword").val("");
142      };

145      $scope.login= function(){
146           var user = $("#logUsername").val(),
147               pass = $("#logPassword").val();
148           if ($("#logUsername").val()==="" && $("#logPassword").val()===""){
149              console.log("username/password boxes are empty!");
150              return;
151           }
152           else if($("#logUsername").val()!=="" && $("#logPassword").val()!==""){
153           console.log("I got username/password valuse successfully..");
154           $http({
155                  method: 'GET',
156                  params:{username: user, password: pass},
157                  url: "http://localhost:3000/users" ,
158                }).success(function (res) {
159                     if(res.length === 0){
160                         alert("Opps, invalid user name or password combination! If you don't have an account alread    y, Please register.." );
161                       return;
162                     }
163                     else {
164                         $scope.username=user;
165                         $scope.showHome();
166                         $("#logoutLink").show();
167                         $("#userWelcome").show();
168                         $("#loginLink").hide();
169                         $("#logUsername").val("");
170                         $("#logPassword").val("");
171                     }
172                });
173           }
174      };
175
176      $scope.logout= function(){
177          $("#logoutLink").hide();
178          $("#userWelcome").hide();
179          $("#loginLink").show();
180          $scope.username="";
181      };
182
183 });//end of Controller..
