'use-strict';

const express = require('express');
const router = express.Router();

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
    console.log(req.body);
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
