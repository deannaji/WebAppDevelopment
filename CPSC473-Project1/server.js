var express= require ("express"),
    app= express(),
    fs = require("fs"),
    bodyParser = require("body-parser"),
    http= require("http").createServer(app);


app.use(express.static(__dirname+ "/views"));
app.use(express.static(__dirname+ "/public"));
app.use(express.static(__dirname+ "/models"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

var data = require("./reddit.json");
//console.log(data.reddit[0]);
console.log(data.users.length);

//routes:

//new post added:
app.post("/reddit", function(req,res){
   console.log(req.body);
   var postId = data.reddit.length + 1;
   var newPost= req.body;
   newPost.id = postId;
   console.log("........");
   console.log(newPost);
   data.reddit.push(newPost);
   fs.writeFile("./reddit.json", JSON.stringify(data));
   res.json({"status":"ok"}); 
});

//new user register:
app.post("/users", function(req,res){
  var newUser=req.body;
  newUser.id= data.users.length +1;
  data.users.push(newUser);
  res.json({"size":data.users.length});
  fs.writeFile("./reddit.json", JSON.stringify(data));
});

app.put("/users", function(req,res){
   console.log(req.body);
   data.users[req.body.id-1] = req.body;
   fs.writeFile("./reddit.json", JSON.stringify(data));
});

app.put("/reddit", function(req,res){
   console.log(req.body);
   data.reddit[req.body.id-1] = req.body;
   fs.writeFile("./reddit.json", JSON.stringify(data));
});

//init posts load route:
app.get("/reddit", function(req,res){
     res.send(data.reddit);
});

//user login route:
app.get("/users", function(req,res){
    //console.log(req.query);
    var reqUser = req.query;
    var result=[];
    data.users.forEach(function(element){
        if (reqUser.username === element.name){
           if(reqUser.password === element.password){
               result.push(element);
           }
        } 
    });
    //console.log(result);
    res.send(result);
});

//init route:
app.get("/", function(req,res){
    res.sendFile(__dirname +"/index.html");

});

//fs.writeFile("./reddit.json", JSON.stringify(data));

http.listen(3000, function(){
    console.log("Listening on port 3000...");
});


