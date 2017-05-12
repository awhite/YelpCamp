const express = require('express');
const router = express.Router();
const Campground    = require('../models/campground');
const middleware    = require('../middleware');

router.get('/', (req, res) => {  // Campgrounds INDEX
    Campground.find({}).then((items) => {
            res.render('campgrounds/index', {
                campgrounds: items
            });
        }).catch((err) => {
            console.log(err);
        });
});

router.get('/new', middleware.checkLoggedIn, (req, res) => {  // Campgrounds NEW
    res.render('campgrounds/new');
});

router.get('/:id', (req, res) => {  // Campgrounds SHOW
    Campground.findById(req.params.id).populate("comments").exec().then((campground) => {
            res.render('campgrounds/show', { campground: campground });
        }).catch((err) => {
            console.log(err);
        });
});

router.post('/', middleware.checkLoggedIn, (req, res) => {  // Campgrounds CREATE
    // get data from form and add to campgrounds
    // redirect back to campgrounds page
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        author: { id: req.user._id, username: req.user.username }
    }).then((item) => {
        res.redirect('/campgrounds');
    }).catch((err) => {
        console.log(err);
    });
});

router.get('/:id/edit', middleware.checkLoggedIn, middleware.checkCampgroundOwnership, (req, res) => {  // Campgrounds EDIT
    Campground.findById(req.params.id).then((campground) => {
        res.render('campgrounds/edit', { campground: campground });
    }).catch((err) => {
        console.log(err);
    });
});

router.put('/:id', middleware.checkLoggedIn, middleware.checkCampgroundOwnership, (req, res) => {  // Campgrounds UPDATE
    Campground.findByIdAndUpdate(req.params.id, req.body.campground).then((campground) => {
        res.redirect(`/campgrounds/${ req.params.id }`);
    }).catch((err) => {
        console.log(err);
        res.redirect('/campgrounds');
    });
});

router.delete('/:id', middleware.checkLoggedIn, middleware.checkCampgroundOwnership, (req, res) => {  // Campgrounds DESTROY
    Campground.findByIdAndRemove(req.params.id).then((result) => {
        res.redirect('/campgrounds');
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = router;

