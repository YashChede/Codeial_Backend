const express = require('express');
const port = 8000;
const app = express();

// using ejs-layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

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
