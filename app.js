var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    User            = require('./models/user'),
    seedDB          = require('./seeds'),
    methodOverride  = require('method-override'),
    flash           = require('connect-flash');
    
const campgroundRoutes  = require('./routes/campgrounds'),
      commentRoutes     = require('./routes/comments'),
      indexRoutes       = require('./routes/index');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/yelp_camp');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// seedDB();  // seed database

// other setup
app.use(flash());

// AUTH/passport setup
app.use(require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =================MIDDLEWARE

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("YelpCamp has started");
});
