const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const data = [
    { 
        name: 'Camp 1', 
        image: 'https://images.unsplash.com/photo-1456305951335-bb8134aeab8a?dpr=2&auto=format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=&bg=',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    },
    { 
        name: 'Camp 2', 
        image: 'https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    },
    { 
        name: 'Camp 3', 
        image: 'https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    }
];

module.exports = () => {
    // Remove campgrounds
    Campground.remove({}).then(() => {
        //add campgrounds
        data.forEach((seed) => {
            Campground.create(seed).then((campground) => {
                Comment.create({
                    text: 'This place is great',
                    author: 'Dave'
                }).then((comment) => {
                    campground.comments.push(comment);
                    campground.save().then((campground) => {
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }).catch((err) => {
        console.log(err);
    });
    
}