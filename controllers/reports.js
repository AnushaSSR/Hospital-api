const Report = require("../models/reports");//Report model

//array to set the valid status values
let validStatus = ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'];

//filter reports by status
module.exports.filterByStatus = async function(req,res) {   
    try {
        if(req.body.status.charAt(0) == "0") {
            console.log("error in mobile number");
        }
        if (req.body.status.trim() == "" || req.body.status == undefined || !validStatus.includes(req.body.status)) {
            //if the ststus sent is not valid
            return res.json(401, {
                message:
                    "Enter or select a valid status from the list (case sensitive) :'Negative','Travelled-Quarantine','Symptoms-Quarantine','Positive-Admit' "
            });
        }   
        let status = req.params.status;
        let filteredReports = await Report.find({status: status}).sort("createdAt");//filter report by status
        if(!filteredReports.length){
            //if no reports exists
            return res.json(409, {
                message: `No reports found for status '${status}' `,
            });
        }//reports exists
        return res.json(409, {
            message: `Reports filtered by status '${status}' are`,
            data: {
                report: filteredReports
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