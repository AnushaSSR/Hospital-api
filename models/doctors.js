const mongoose = require('mongoose');

const doctorsSchema = new mongoose.Schema({
    //unique username of doctor for login
    username:{
        type: String,
        required: true,
        unique: true
    },
    //unique doctor's email id
    email: {
        type: String,
        required: true,
        unique: true
    },
    //password for doctor login
    password: {
        type: String,
        required: true,
    },
    //doctor's name
    name: {
        type: String,
        required: true,
      
    }
}, {
        timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorsSchema);

module.exports = Doctor;