var login = require('./login');
var signup = require('./signup');
//var quiz = require('./quiz');

var User = require('../../models/user');

module.exports = function(passport){

    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.User.findById(id, function(err, user) {
            console.log('deserializing user:',user);
            done(err, user);
        });
    });

    login(passport);
    signup(passport);
  //  quiz(passport);
   
    console.log("coming into init.js");

}
