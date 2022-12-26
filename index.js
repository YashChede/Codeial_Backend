const express = require('express');
const port = 8000;
const app = express();

// due to warning
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const db = require('./config/mongoose');
// using ejs-layouts
const expressLayouts = require('express-ejs-layouts');

// static files
app.use(express.static('./assets'));


app.use(expressLayouts);

// extract static files
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// using express router
app.use('/',require('./routes/index'));

// setting view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server : ${err}`);
    }
     console.log(`Server is running ont port : ${port}`);
});
