/* Assignment8:  Adding real-time notifications to Amazeriffic website
   Written by: Dean Naji
   Email: deannaji@csu.fullerton.edu
*/
// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
var express = require("express"),
    app = express(),
    http = require("http").createServer(app),
    io = require("socket.io")(http); //requiring socket.io

//Connection event handler:
io.on("connection", function(socket) {
    "use strict";
    console.log("user connected");

    //Socket comming from a connected user:
    socket.on("user post", function(post) {
        //sending the socket to all connected users, except the first sender:
        socket.broadcast.emit("user post", post);
    });
});

http.listen(8080, function() {
    "use strict";
    console.log("Listenning on port 8080...");
});
