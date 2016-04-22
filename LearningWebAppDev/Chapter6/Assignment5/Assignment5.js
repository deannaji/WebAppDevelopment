// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
var express = require("express"),
    http = require("http"),
    bodyParser = require("body-parser"),
    app;

app = express();
http.createServer(app).listen(3000);

var guess, index, result, resultSet = ["head", "tail"],
    record = [0, 0];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));




//post request:
app.post("/flip", function(req, res) {
    "use strict";
    guess = req.body.call;
    index = Math.floor((Math.random() * 2) + 1);
    result = resultSet[index - 1];
    if (guess === result) {
        record[0]++;
        res.json({"result":"win"});
    } else {
        record[1]++;
        res.json({"result":"lose"});
    }
});




//get stats request:
app.get("/stats", function(req, res) {
    "use strict";
    res.json({
        "wins": record[0],
        "losses": record[1]
    });

});
