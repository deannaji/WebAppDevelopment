var express = require("express"),
    app = express(),
    http = require("http").createServer(app),
    io = require("socket.io")(http); //requiring socket.io

var clients=[],
    rooms=[],
    clientId,
    room="room1";//init room
rooms.push(room);

//User socket connection event handler:
io.sockets.on("connect", function(socket) {
 "use strict";
 console.log("A user connected");
   
 socket.on("connected",function(id){
       console.log("connected client ID is: "+id);
       clientId=id;

  if(clientId === 0){ 

    //if this user is the first user, i.e only init room is available and the length is zero:
    if (io.nsps["/"].adapter.rooms[room]=== undefined){
        socket.join(room);
        clientId= generateClientId();
        socket.emit("privateMsg",clientId);
        //console.log("room size: "+ io.nsps["/"].adapter.rooms[room].length );
        console.log(io.nsps["/"].adapter.rooms[room]);
        console.log("clients:"+clients);

    }
    //else if there is already one user in the room, i.e this is the second user:
    else{
      var roomSize= io.nsps["/"].adapter.rooms[room].length;
      if (roomSize < 2){
         socket.join(room);
         clientId= generateClientId();
         socket.emit("privateMsg",clientId);
         //console.log("room size: " + roomSize);
         console.log(io.nsps["/"].adapter.rooms[room]);
         console.log("clients:"+clients);
      }
      //if there are two users in the room, i.e the room is full:
      else if (roomSize >= 2){
         console.log("sorry, the room is full!");
         addNewRoom();
         console.log("we will give you a new room:");
         //console.log(rooms);
         //console.log(room);
         socket.join(room);
         clientId= generateClientId();
         socket.emit("privateMsg",clientId);
      }
    //console.log(Object.keys(io.nsps["/"].adapter.rooms[room]).length);
    } 
    

    //Socket comming from a connected user:
    socket.on("answer", function(clientId) {
           console.log("answering client:"+clientId);
           //if(ans === "true"){
              var roomNum = Math.ceil(clientId/2);
              console.log("room #:"+roomNum);
              room = "room"+roomNum;
              socket.broadcast.to(room).emit("otherUserResult", "true");
          //}
    });
  }//end of the main if

 });//end of on connect event

});//end of socket connection event handler

function addNewRoom(){
   var newNum = rooms.length +1;
   var newRoom = "room" + newNum;
   room = newRoom;
   rooms.push(newRoom);
}

function generateClientId(){
   var clientId=0;
   if (clients.length === 0){
       clientId= 1;
   }
   else {
       clientId= clients.length+ 1;
   }
   clients.push(clientId);
   return clientId;
}


http.listen(3000, function() {
    "use strict";
    console.log("Sockets server is listenning on port 3000...");
});
