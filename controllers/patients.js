const Patient = require('../models/patients');//Patient model
// const jwt = require("jsonwebtoken");
const Doctor = require('../models/doctors');//Doctor model
const Report = require('../models/reports');//Report model
const { report } = require('../routes');


//array to set the valid status values
let validStatus = ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'];

//Register patient
module.exports.register = async function (req, res) {
    try {
        // //checking by the doctor id
        // let doctor = await Doctor.findById(req.body.doctorId);//check if the doctor exists or doctor is logged in 
        // if (!doctor) {
        //     //if not authorised
        //     return res.json(401, {
        //         message: "Unauthorised accesss : Doctor"
        //     });
        // }
        //validating user inputs
        if (req.body.name.trim() == "" || req.body.name == undefined) {
            //if the name entered is null or undefined
            return res.json(400, {
                message: "Name is not provided .Please enter valid name",
            });
        }
        if(req.body.mobile_number.charAt(0) == "0") {
            //if entered mobile numnberstart with 0
            return res.json(400, {
                message: "Mobile Number must not start with digit 0",
            });        }

        if (req.body.mobile_number.length != 10 ) {
            //if the mobile number entered is less or gretaer than 10 digits
            return res.json(409, {
                message: "Please enter valid 10 digit mobile number",
            });
        }
        let existingPatient = await Patient.findOne({ mobile_number: req.body.mobile_number });// Check if the patients records alreday exists
        if (existingPatient) {
            //if existing patient, return the existing details
            return res.json(409, {
                message: "Patient already registered, details are",
                data: {
                    patients: existingPatient
                }
            });
        } else {
            //create new patient record
            user = await Patient.create(req.body);
            return res.json(201, {
                message: "Patient Created",
                data: {
                    patient: user
                }
            });
        }
    } catch (err) {
        //catching errors
        console.log("error :", err);
        if(err.valueType == 'string') {
            return res.json(401, {
                message: "Enter numerical mobile number with digits 0-9"
            });
        }
        return res.json(500, {
            message: "Internal server error"
        });
    }
}

//create report
module.exports.createReport = async function (req, res) {
    if (req.body.status.trim() == "" || req.body.status == undefined || !validStatus.includes(req.body.status)) {
        //if the ststus sent is not valid
        return res.json(401, {
            message:
                "Enter or select a valid status from the list (case sensitive) :'Negative','Travelled-Quarantine','Symptoms-Quarantine','Positive-Admit' "
        });
    }
    try {
        if (req.body.doctorId == undefined || req.body.doctorId.trim() == "") {
            //if the doctro id input is undefined or null
            return res.json(400, {
                message: "Enter valid inputs"
            })
        }
        let createdBy = await Doctor.findById(req.body.doctorId);//chcek if doctor details exists
        if (!createdBy) {
            //if doesnot exist
            return res.json(401, {
                message: "Unauthorised accesss : Doctor id invalid"
            });
        }
        let patient = await Patient.findById(req.params.id);//check if the patient exists
        if (!patient) {
            //if not a patient
            return res.json(422, {
                message: "no patients records found for the specified patient, register the patient first"
            });
        }
        //if doctor and patients exists, create a report
        let report = await Report.create({
            created_by: createdBy.name,
            status: req.body.status,
            patient: patient.name
        });
        //format the date
        let dateVal = new Date(report.createdAt);//append the date value 
        let date = (dateVal.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
        report.date = date.toString();//save in the required format
        await report.save();
        patient.reports.push(report);//save the reports in the patients records
        await patient.save();
        return res.json(201, {
            message: "Report Created",
            data: {
                report: report
            }
        });
    } catch (err) {
        //catching errors
        console.log("error", err);
        return res.json(500, {
            message: "Internal server error"
        });
    }
}

//fetch all the reports of a particular patient
module.exports.allReports = async function (req, res) {
    try {
        let patient = await Patient.findById(req.params.id).populate({
            path: "reports",
            model: "Report",
        });//find the patient by id and populate the reuitred values
        let reports = patient.reports;//get reports from the reports array of patient
        return res.json(201, {
            message: `Reports of the patient '${patient.name}' are : `,
            data: {
                reports: reports
            }
        });
    } catch (err) {
        //catching errors
        console.log("error", err);
        return res.json(500, {
            message: "Internal server error"
        });
    }
}