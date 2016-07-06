
var mongoose = require('mongoose');

var User = mongoose.model('User',{
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String
});
console.log("going into user.js");
var Quiz= mongoose.model('Quiz',{
    username: String,
    quizzname: String,
    category: String,
    questionsData:[ 
        contents
    ]	

});
var contents=new mongoose.Schema({
		id: Number,
        questions:String,
        choices: [String],
        answer: String
    });


module.exports={
	User: User,
	Quiz: Quiz
};
