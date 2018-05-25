'use-strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Deck = require('../models/deck');
const middleware = require('../middleware');

// GET '/' requests
router.get('/', function(req, res, next) {
    return res.render('index', { title: 'Home' });
});

// GET '/register' requests
router.get('/register', middleware.loggedIn, function(req, res, next) {
    return res.render('register', { title: 'Sign Up' });
});

// POST '/register' requests
router.post('/register', function(req, res, next) {
    //Make sure we captured all form fields
    if (req.body.email &&
        req.body.name &&
        req.body.password &&
        req.body.passwordMatch) {

        //make sure password === passwordMatch
        if (req.body.password !== req.body.passwordMatch) {
            const error = new Error('Password does not match password confirmation')
            next(error);
        }

        //populate an object in shape of model.js UserSchema with the user data from the request
        const userData = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        };

        //Write it to MongoDB with mongoose's model.create() method using the User model
        User.create(userData, function(error, user) {
            if (error) {
                return next(error);
            } else {
                //for now just confirm success up to this point
                console.log('New user document added to mongoDB FlashCards users collection!');

                //assign the user's db document _id to the req.session.userId
                req.session.userId = user._id;
                //redirect to logged in landing page.
                return res.redirect('/profile');
            }
        });

    } else {
          const err = new Error('All fields are required.');
          err.status = 400;
          return next(err);
    }
});

// GET '/login' requests
router.get('/login', middleware.loggedIn, function(req, res, next) {
    return res.render('login', { title: 'Log In' });
});

// POST 'login' requests
router.post('/login', middleware.loggedIn, function(req, res, next) {
    //make sure required credentials are furnished
    if (req.body.email && req.body.password) {
        //authenticate the credentials
        User.authenticateUser(req.body.email, req.body.password, function(error, user) {
            //reject incorrect credentials
            if (error || !user) {
                const error = new Error('Incorrect Email or Password.');
                error.status = 401;
                return next(error);
            //accept good credentials
            } else {
                //create a user session here by assigning the user's mongo id to their session id...
                req.session.userId = user._id;
                //and redirect to /profile
                res.redirect('/profile');
            }
        });
    //reject incomplete credentials
    } else {
        const error = new Error('Email and password are both required.');
        error.status = 400;
        return next(error);
    }
});

//GET '/createDeck' requests
router.get('/createDeck', middleware.requiresLoggedIn, function(req, res, next) {
    return res.render('createDeck', { title: 'Create A Deck' });
});

//POST '/createDeck' requests...a test to see if the deck.js model holds water
router.post('/createDeck', middleware.requiresLoggedIn, function(req, res, next) {
    const deckData = req.body;
    deckData.deckAuthor = req.session.userId
    console.log(deckData);
    //write it to mongoDB using mongoose's create() method on the Deck model
    Deck.create(deckData, function(error, deck) {
        if (error) {
            return next(error);
        } else {
            console.log(`New deck added to MongoDB, author: ${req.session.userId}`);
            return res.sendStatus(200);
        }
    });
});

//GET '/viewDecks' requests
router.get('/viewDecks', middleware.requiresLoggedIn, function(req, res, next) {
    //Query DB for decks associate w/ req.session.userId and return the decks in the response
    Deck.find({deckAuthor: req.session.userId})
        .exec(function(error, decks) {
            if (error) {
                return next(error);
            } else {
                const userDecks = JSON.stringify(decks);
                return res.render('userDecks', { title: 'Your Decks' , userDecks });
            }
        });
    //Let the front end receive a json object of the relevant decks, map it and render a list
});

//GET '/logout' requests
router.get('/logout', function(req, res, next) {
    if (req.session) {
        req.session.destroy(function(error) {
            if (error) {
                return next(error);
            } else {
                return res.redirect('/');
            }
        });
    }
});

// GET '/profile' requests
router.get('/profile', middleware.requiresLoggedIn, function(req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                return res.render('profile', {
                    title: 'Profile',
                    name: user.name
                });
            }
        });
});

// GET '/about' requests
router.get('/about', function(req, res, next) {
    return res.render('about', { title: 'Sign Up' });
});

// GET '/contact' requests
router.get('/contact', function(req, res, next) {
    return res.render('contact', { title: 'Sign Up' });
});

module.exports = router;
