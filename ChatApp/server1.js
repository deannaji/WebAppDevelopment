var app = require("express")(),
    express = require("express"),
    http = require("http").createServer(app),
    io = require("socket.io")(http);

app.use(express.static(__dirname + "/MyChatApp"));

app.get("/MyChatApp", function(req,res){
   res.sendFile(__dirname + "/index.html");
});



io.on("connection", function(socket){
   console.log("a user connected..");
   socket.on("chat message", function(msg){
       io.emit("chat message",msg);
   });
   socket.on("disconnect", function(){
       console.log("a user disconnected");
   });
});



http.listen(3000,function(){
   console.log("Listening on port: 3000..");
});
