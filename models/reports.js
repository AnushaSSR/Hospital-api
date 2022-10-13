const mongoose = require('mongoose');

const reportsSchema = new mongoose.Schema({
    //doctor who createdthe report
    created_by: {
        type:String,
        required: true
    },
    //patients status
    status: {
        type: String,
        enum: ['Negative','Travelled-Quarantine','Symptoms-Quarantine','Positive-Admit'],
        required: true
    },
    //patient's name
    patient: {
        type:String,
        required: true
    },
    //date of creating the report
    date: {
        type: String
    }
}, {
    timestamps: true
});

const Report = mongoose.model('Report', reportsSchema);

module.exports = Report;
