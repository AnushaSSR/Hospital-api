const mongoose = require('mongoose');

const reportsSchema = new mongoose.Schema({
    created_by: {
        type:String,
        required: true
    },
    status: {
        type: String,
        enum: ['Negative','Travelled-Quarantine','Symptoms-Quarantine','Positive-Admit'],
        required: true
    },
    patient: {
        type:String,
        required: true
    },
    date: {
        type: String
    }

}, {
    timestamps: true
});

const Report = mongoose.model('Report', reportsSchema);

module.exports = Report;
