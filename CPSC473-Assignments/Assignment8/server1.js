/* Assignment8:  Adding real-time notifications to Amazeriffic website
   Written by: Dean Naji
   Email: deannaji@csu.fullerton.edu
*/
// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
var express = require("express"),
    app = express(),
    http = require("http").createServer(app),
    // import the mongoose library
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");


app.use(express.static(__dirname + "/client"));

app.use(bodyParser.urlencoded({
    extended: true
}));

// connect to the amazeriffic data store in mongo
mongoose.connect("mongodb://localhost/amazeriffic");

// This is our mongoose model for todos
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [String]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);
app.get("/todos.json", function(req, res) {
    "use strict";
    ToDo.find({}, function(err, toDos) {
        res.json(toDos);
    });
});

app.post("/todos", function(req, res) {
    "use strict";
    console.log("body is: ");
    console.log(req.body);

    var newToDo = new ToDo({
        "description": req.body.description,
        "tags": req.body.tags
    });

    newToDo.save(function(err) {
        if (err !== null) {
            // the element did not get saved!
            console.log(err);
            res.send("ERROR");
        } else {
            // our client expects *all* of the todo items to be returned, so we'll do
            // an additional request to maintain compatibility
            ToDo.find({}, function(err, result) {
                if (err !== null) {
                    // the element did not get saved!
                    res.send("ERROR");
                }
                res.json(result);
            });
        }
    });

});
http.listen(3000, function() {
    "use strict";
    console.log("Listenning on port 3000...");
});
