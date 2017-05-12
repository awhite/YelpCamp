const express       = require('express');
const router        = express.Router();
const User          = require('../models/user');
const passport      = require('passport');
const middleware    = require('../middleware');

router.get('/', (req, res) => {  // Landing page
    res.render('landing');
});

router.get('/register', (req, res) => {  // Register page
    res.render('register');
});

router.post('/register', (req, res) => {  // handle regster
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            req.flash('error', err.message)
            res.redirect('/register');
        }
        passport.authenticate('local')(req, res, () => {
            req.flash('success', 'Signed up successfully');
            res.redirect('/campgrounds');
        });
    });
});

router.get('/login', (req, res) => {  // Login page
    res.render('login');
});

router.post('/login', passport.authenticate('local',  // handle login
    { 
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), (req, res) => {
    
});

router.get('/logout', (req, res) => {  // logout
    req.logout();
    req.flash('error', 'Logged out');
    res.redirect('/campgrounds');
});

module.exports = router;