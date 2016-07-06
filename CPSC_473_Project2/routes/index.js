var express = require('express');
var router = express.Router();
var Quiz = require('../models/user');
//var style=require('../public/stylesheets/style.css');
var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = function(passport) {

    router.get('/', function(req, res) {
        Quiz.Quiz.find({}, function(err, values) {
            console.log("in the quizdisplay");
            if (err) {
                console.log('Error in getting value from database: ' + err);
                return (err);
            } else {

                res.render('index', {
                    user: req.user,
                    values: values
                });
            }
        });
        console.log("in router file" + req.user);
    });

    router.get('/login', function(req, res) {
        console.log("getting d value from login.js");
        res.render('login', {
            message: req.flash('message')
        });
    });
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    router.get('/signup', function(req, res) {
        res.render('register', {
            message: req.flash('message')
        });
    });
    router.get('/quiz/:id', function(req, res) {

        Quiz.Quiz.find({}, function(err, values) {
            if (err) {
                console.log('Error in getting value from database: ' + err);
                return (err);
            } else {

                res.render('quiz', {
                    user: req.user,
                    values: values,
                    quizname: req.params.id
                });
            }
        });

    });
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    router.get('/home', isAuthenticated, function(req, res) {
        res.render('home', {
            user: req.user
        });
    });

    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    router.post('/createQuizz', function(req, res) {

        var quiz = new Quiz.Quiz({
            "username": req.body.username,
            "quizzname": req.body.quizzname,
            "category": req.body.category,
            "questionsData": [{
                "id": 1,
                "questions": req.body.question1,
                "choices": [
                    req.body.wrong1,
                    req.body.wrong2,
                    req.body.correct1,
                    req.body.wrong3,
                ],
                "answer": req.body.correct1,
            }, {
                "id": 2,
                "questions": req.body.question2,
                "choices": [
                    req.body.correct2,
                    req.body.wrong4,
                    req.body.wrong5,
                    req.body.wrong6,
                ],
                "answer": req.body.correct2,
            }, {
                "id": 3,
                "questions": req.body.question3,
                "choices": [
                    req.body.wrong7,
                    req.body.wrong8,
                    req.body.wrong9,
                    req.body.correct3,
                ],
                "answer": req.body.correct3
            }, {
                "id": 4,
                "questions": req.body.question4,
                "choices": [
                    req.body.correct4,
                    req.body.wrong10,
                    req.body.wrong11,
                    req.body.wrong12,
                ],
                "answer": req.body.correct4,
            }, {
                "id": 5,
                "questions": req.body.question5,
                "choices": [
                    req.body.wrong13,
                    req.body.wrong14,
                    req.body.wrong15,
                    req.body.correct5,
                ],
                "answer": req.body.correct5
            }, {
                "id": 6,
                "questions": req.body.question6,
                "choices": [
                    req.body.wrong16,
                    req.body.wrong17,
                    req.body.wrong18,
                    req.body.correct6,
                ],
                "answer": req.body.correct6
            }]
        });

        quiz.save();

        res.json({
            "message": "Successfully inserted data"
        });

    });
    return router;

}