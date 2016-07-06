var    fs = require("fs"),
       data= require ("../models/model.js");


//Routes:
//index route:
exports.index= function(req,res){
    res.sendFile(__dirname +"/index.html");
}

//loading posts route:
exports.loadPosts= function(req,res){
     "use strict";
     res.send(data.reddit);
}

//user login route:
exports.login= function(req,res){
    "use strict";
    var reqUser = req.query;
    var result=[];
    data.users.forEach(function(element){
        if (reqUser.username === element.name){
           if(reqUser.password === element.password){
               result.push(element);
           }
        } 
    });
    res.send(result);
}

//likes change route:
exports.likes= function(req,res){
   "use strict";
   data.reddit[req.body.id-1] = req.body;
   fs.writeFile("./reddit.json", JSON.stringify(data));
}

//user likes & notlikes array route:
exports.userLikesArray=function(req,res){
   "use strict";
   data.users[req.body.id-1] = req.body;
   fs.writeFile("./reddit.json", JSON.stringify(data));
}

//new user register:
exports.register= function(req,res){
  "use strict";
  var newUser=req.body;
  newUser.id= data.users.length +1;
  data.users.push(newUser);
  res.json({"size":data.users.length});
  fs.writeFile("./reddit.json", JSON.stringify(data));
}

//new post route:
exports.newPost= function(req,res){
   "use strict";
   var postId = data.reddit.length + 1;
   var newPost= req.body;
   newPost.id = postId;
   data.reddit.push(newPost);
   fs.writeFile("./reddit.json", JSON.stringify(data));
   res.json({"status":"ok"}); 
}

