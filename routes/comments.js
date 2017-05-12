const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground    = require('../models/campground');
const Comment       = require('../models/comment');
const middleware    = require('../middleware');

router.get('/new', middleware.checkLoggedIn, (req, res) => {  // Comments NEW
    Campground.findById(req.params.id).then((campground) => {
        res.render('comments/new', { campground: campground });
    }).catch((err) => {
        console.log(err);
    });
});

router.post('/', middleware.checkLoggedIn, (req, res) => {  // Comments CREATE
    Campground.findById(req.params.id).then((campground) => {
        Comment.create(req.body.comment).then((comment) => {
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save().then(() => {
                campground.comments.push(comment);
                campground.save();
                res.redirect(`/campgrounds/${req.params.id}`);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
            res.redirect('/campgrounds');
        })
    }).catch((err) => {
        console.log(err);
    });
});

router.get('/:commentId/edit', middleware.checkLoggedIn, middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.commentId).then((comment) => {
        res.render('comments/edit', { comment: comment, campgroundId: req.params.id });
    }).catch((err) => {
        console.log(err);
    });
});

router.put('/:commentId', middleware.checkLoggedIn, middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment).then((comment) => {
        res.redirect(`/campgrounds/${ req.params.id }`);
    }).catch((err) => {
        console.log(err);
    });
});

router.delete('/:commentId', middleware.checkLoggedIn, middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.commentId).then((item) => {
        req.flash('success', 'Comment deleted.')
        res.redirect(`/campgrounds/${ req.params.id }`);
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = router;