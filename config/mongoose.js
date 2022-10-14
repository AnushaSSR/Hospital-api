//connect to mongoose
const mongoose = require('mongoose');//require mongoose

require('dotenv').config();
const mongoString = process.env.DATABASE_URL;

console.log(`mongo string is`, mongoString);
mongoose.connect(mongoString);
const db = mongoose.connection;
// mongoose.connect("mongodb://localhost/Hospital_API_dev");//connect to database
// const db = mongoose.connection;//connection to db
db.on('error', console.error.bind(console, "Error in connecting to MongoDB"));//if error occured

db.once('open', function () {
    //connected succesfully
    console.log(`Connected to Database :: MongoDB`);
});

module.exports = db;


