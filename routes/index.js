'use-strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user')

// GET '/' requests
router.get('/', function(req, res, next) {
    return res.render('index', { title: 'Home' });
});

// GET '/register' requests
router.get('/register', function(req, res, next) {
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
                console.log("Error during User.create() callback function")
                // return next(error);
            } else {
                //assign the user's db document _id to the req.session.userId

                //redirect to logged in landing page.

                //for now just confirm success up to this point
                res.send('Signed up succesfully!');
            }
        });
    }

    return res.send('/register POST request received!');
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
