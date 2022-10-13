const mongoose = require('mongoose');

const doctorsSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
      
    }
}, {
        timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorsSchema);

module.exports = Doctor;