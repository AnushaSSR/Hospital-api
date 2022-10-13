const express = require('express');
const app = express();
const port= 8000;
const db= require('./config/mongoose');

const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');
// get the url
app.use(express.urlencoded());

app.use('/',require('./routes/index'));
app.listen(port, function(err) {
    if(err) {
        console.log(`Error in loading server ${err}`);
    }
    else {
        console.log(`Server is up and running in port :: ${port}`);
    } 
});