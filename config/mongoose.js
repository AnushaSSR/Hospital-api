//connect to mongoose
const mongoose = require('mongoose');//require mongoose

require('dotenv').config();//to manage .env file
const mongoString = process.env.DATABASE_URL;// databse url from the env variables

mongoose.connect(mongoString);//connect mongoose to database path
const db = mongoose.connection;//establishing connection

db.on('error', console.error.bind(console, "Error in connecting to MongoDB"));//if error occured

db.once('open', function () {
    //connected succesfully
    console.log(`Connected to Database :: MongoDB`);
});

module.exports = db;


