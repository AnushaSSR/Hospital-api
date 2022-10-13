const express = require('express');
const app = express();
const port= 8000;
const db= require('./config/mongoose');
const passport = require('passport');
//jwt startegy config file
const passportJWT = require('./config/passport-jwt-strategy');

// to parse data from from
app.use(express.urlencoded());

// use the routes folder
app.use('/',require('./routes/index'));

//listen to port
app.listen(port, function(err) {
    if(err) {
        //if any error
        console.log(`Error in loading server ${err}`);
    } else {
        //if up and running
        console.log(`Server is up and running in port :: ${port}`);
    } 
});