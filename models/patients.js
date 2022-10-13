const mongoose = require('mongoose');

const patientsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        unique: true,
        required: true,
        minLength:10,
maxLength:10    },
    remarks: {
        type: String
        
    },
    reports :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Report'
        }
    ]
}, {
    timestamps: true
});

const Patient = mongoose.model('Patient', patientsSchema);

module.exports = Patient;