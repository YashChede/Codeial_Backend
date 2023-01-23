const express = require('express');
const port = 8000;
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const session = require('express-session');
const sassMiddleware = require('node-sass-middleware');
// due to warning
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const db = require('./config/mongoose');

// using ejs-layouts
const expressLayouts = require('express-ejs-layouts');

// Mongo store
const MongoStore = require('connect-mongo');

// using sass
app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}));

// for post request
app.use(express.urlencoded());

app.use(cookieParser());

// static files
app.use(express.static('./assets'));


app.use(expressLayouts);

// extract static files
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// setting view engine
app.set('view engine','ejs');
app.set('views','./views');

// using express session
app.use(session({
    name : 'codeial',
    // TODO change the secret before deployment in production mode
    secret : "blahsomething",
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    // use mongo store to store the session cookie in db
    store :  MongoStore.create({
        mongoUrl : 'mongodb://localhost/codeial_development',
        autoRemove : 'disabled'
    },function(err){
        if (err)
        console.log(err || 'connect-mongodb setup');
    })
}));

app.use(passport.initialize()); 
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// using express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server : ${err}`);
    }
     console.log(`Server is running ont port : ${port}`);
});
