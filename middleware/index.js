const Campground    = require('../models/campground'),
      Comment       = require('../models/comment');
let middleware = {};

middleware.checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please login first.');
    res.redirect('/login');
}

middleware.checkCampgroundOwnership = (req, res, next) => {
    Campground.findById(req.params.id).then((campground) => {
        if (campground.author.id.equals(req.user._id)) {
            next();
        } else {
            req.flash('error', 'Permission denied.');
            res.redirect('back');
        }
    }).catch((err) => {
        req.flash('error', 'Campground not found.');
        console.log(err);
    });
}

middleware.checkCommentOwnership = (req, res, next) => {
    Comment.findById(req.params.commentId).then((comment) => {
        if (comment.author.id.equals(req.user._id)) {
            next();
        } else {
            req.flash('error', 'Permission denied.');
            res.redirect('back');
        }
    }).catch((err) => {
        req.flash('error', 'An error occurred.');
        console.log(err);
    });
}

module.exports = middleware;