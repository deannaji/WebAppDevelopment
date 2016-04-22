/* Assignment6: Coin flip API using Redis
   Written by: Dean Naji
   Email: deannaji@csu.fullerton.edu
*/
// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
var express = require("express"),
    http = require("http"),
    redis = require("redis"), //requireing redis
    bodyParser = require("body-parser"),
    redisClient,
    app;

redisClient = redis.createClient(); //creating redis client
app = express();
http.createServer(app).listen(3000);
var winsCount = 0,
    lossesCount = 0,
    guess, resultSet = ["head", "tail"];
app.use(bodyParser.json());

//post request:
app.post("/flip", function(req, res) {
    "use strict";
    guess = req.body.call;
    var index = Math.floor((Math.random() * 2) + 1); //creating a random value

    if (guess === resultSet[index - 1]) {
        redisClient.incr("wins"); //incrementing wins value by 1
        res.json({
            "result": "win"
        });
    } else {
        redisClient.incr("losses"); //incrementing losses value by 1
        res.json({
            "result": "lose"
        });
    }

});


//get stats request:
app.get("/stats", function(req, res) {
    "use strict";
    //getting wins and losses from redis:
    redisClient.mget(["wins","losses"], function(err, result) {
        if (err !== null) {
            console.log(err);
            return;
        }
        //parsing the values comming from redis into integers:
        winsCount = parseInt(result[0], 10) || 0;
        lossesCount = parseInt(result[1], 10) || 0;
    });
    //returning the result in JSON formant to the user:
    res.json({
        "wins": winsCount,
        "losses": lossesCount
    });
});


//Delete http request on stats:
app.delete("/stats", function() {
    "use strict";
    //setting wins & losses to zero in redis
    redisClient.set("wins", 0);
    redisClient.set("losses", 0);
});
