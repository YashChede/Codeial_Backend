const express = require('express');
const port = 8000;
const app = express();

// using express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server : ${err}`);
    }
     console.log(`Server is running ont port : ${port}`);
});