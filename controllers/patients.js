const Patient = require('../models/patients');
const jwt = require("jsonwebtoken");
const Doctor = require('../models/doctors');
const Report = require('../models/reports');
const { report } = require('../routes');


 let validStatus=['Negative','Travelled-Quarantine','Symptoms-Quarantine','Positive-Admit'];


module.exports.register = async function (req, res) {

    
    try {

        if(req.body.name.trim() == "" || req.body.name == undefined) {
            return res.json(400, {
                message: "User details are undefined .Please enter valid name",
            });
        }
        if (req.body.mobile_number.length !=10){
            return res.json(409, {
                message: "Please enter valid 10 digit mobile number",
            });
        }
    
        let existingPatient = await Patient.findOne({ mobile_number: req.body.mobile_number });
        if (existingPatient) {
            return res.json(409, {
                message: "Patient already registered, details are",
                data: {
                    patients: existingPatient
                }
            });
        }

        let user = await Patient.findOne({ mobile_number: req.body.mobile_number });
        if (!user) {
            user = await Patient.create(req.body);
            return res.json(201, {
                message: "Patient Created",
                data: {
                    patient: user
                }
            });
        } 
    } catch (err) {
        console.log("error :", err);

        return res.json(500, {
            message: "Internal server error"
        });
    }
}


module.exports.createReport = async function (req, res) {
    let patient = await Patient.findById(req.params.id);

    if(req.body.status.trim() == "" || req.body.status == undefined || !validStatus.includes(req.body.status)){
        console.log( "not valid status", validStatus.includes(req.body.status) );
        return res.json (401, {
            message:
            "Enter or select a valid status from the list (case sensitive) :'Negative','Travelled-Quarantine','Symptoms-Quarantine','Positive-Admit' "

        });

    }

    try {
        let createdBy = await Doctor.findById(req.body.doctorId);
        if(!createdBy) {
            return res.json(401, {
                message: "Unauthorised accesss : Doctor id invalid"
            });

        }
        // // let existingReport = await Report.findOne({ created_by: createdBy.name } && { status: req.body.status });

        // // if (existingReport) {
        // //     return res.json(409, {
        // //         message: "Report already created",
        // //         data: {
        // //             report: existingReport
        // //         }
        // //     });
        // // }
        // // else {

        //     // console.log("created by ",createdBy.name);
        //     let patient = await Patient.findById(req.params.id);

            if(!patient){
                
            return res.json(422, {
                message: "no patients records found for the specified patient"
            });

        
            }
           
            // console.log(patient);

            // console.log(req.body.status);

            let report = await Report.create({
                created_by: createdBy.name,
                status: req.body.status,
                patient:patient.name
            });

            let dateVal = new Date(report.createdAt);
            let date= (dateVal.toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'}));


            report.date = date.toString();
            await report.save();
            

            // console.log(report);

            patient.reports.push(report);
            await patient.save();
            // console.log("added report to ",patient);


            return res.json(201, {
                message: "Report Created",
                data: {
                    report: report
                }
            });
        // }
        // } else {
        //     return res.json(409, {
        //         message: "User already exists"
        //     });
    } catch (err) {
        console.log("error", err);

        return res.json(500, {
            message: "Internal server error"
        });
    }
}


module.exports.allReports = async function (req, res) {
    try {
        
        let patient = await Patient.findById(req.params.id).populate({
            path: "reports",
            model: "Report",
        });
        let reports = patient.reports;
        return res.json(201, {
            message: `Reports of the patient '${patient.name}' are : `,
            data: {
                reports: reports
            }
        });
    } catch (err) {
        console.log("error", err);

        return res.json(500, {
            message: "Internal server error"
        });
    }
}

