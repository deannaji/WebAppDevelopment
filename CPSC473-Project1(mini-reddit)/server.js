var express= require ("express"),
    app= express(),
    bodyParser = require("body-parser"),
    routes = require ("./routes/routes.js");
    http= require("http").createServer(app);


app.use(express.static(__dirname+ "/views"));
app.use(express.static(__dirname+ "/public"));
app.use(express.static(__dirname+ "/models"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.set('port', process.env.PORT || 8080);
var port= app.get('port');

//routes:
//new post added:
app.post("/reddit", routes.newPost);

//new user register:
app.post("/users", routes.register);

//user likes & notlikes array:
app.put("/users", routes.userLikesArray);

//likes status change:
app.put("/reddit", routes.likes);

//init posts load:
app.get("/reddit", routes.loadPosts);

//login:
app.get("/users", routes.login);

//init route:
app.get("/", routes.index);


http.listen(port, function(){
    "use strict";
    console.log("Listening on port "+port+"...");
});


