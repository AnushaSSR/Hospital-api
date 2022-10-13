const mongoose = require('mongoose');

const patientsSchema = new mongoose.Schema({
    //name of the patient
    name: {
        type: String,
        required: true
    },
    //unique mobile number of patient 
    mobile_number: {
        type: Number,
        unique: true,
        required: true,
        maxLength:10 
    },
    //remarks if any, optional
    remarks: {
        type: String  
    },
    //array of the reports corresponding to patient
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