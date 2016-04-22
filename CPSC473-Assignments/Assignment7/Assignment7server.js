/* Assignment7:  Links API using mongodb
   Written by: Dean Naji
   Email: deannaji@csu.fullerton.edu
*/
// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
var express = require("express"),
    http = require("http"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app;

app = express();
http.createServer(app).listen(3000);


//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//connect to mongodb:
mongoose.connect("mongodb://localhost/links");


//creating the schema:
var linksSchema = mongoose.Schema({
    title: String,
    link: String,
    clicks: Number
});

//creating the model:
var Links = mongoose.model("Links", linksSchema);

//GET all links route:
app.get("/links", function(req, res) {
    "use strict";
    Links.find({}, function(err, links) {
        if (err) {
            console.log(err);
            return;
        }
        res.json(links);
    });
});

//POST links route:
app.post("/links", function(req) {
    "use strict";
    //grabbing the user text input from the html file:
    var linkurl = req.body.linkText,
        title = req.body.titleText;

    var newLink = new Links({
        "title": title,
        "link": linkurl,
        "clicks": 0
    });
    //writing new link to the DB:
    newLink.save();
});

//GET clicks route:
app.get("/clicks/:title", function(req, res) {
    "use strict";
    //Grabbing the url parameter, which comes with the GET req url:
    var reqTitle = req.params;

    //Updating the 'clicks' in the DB by 1:
    Links.update(reqTitle, {
        $inc: {
            clicks: 1
        }
    }, function(err) {
        if (err) {
            console.log(err);
            return;
        }
    });

    //qureying the DB for specific title:
    Links.find({
        "title": reqTitle.title
    }, function(err, result) {
        if (err) {
            console.log(err);
        }
        //redirecting using express.js:
        res.redirect(result[0].link);
    });
});
