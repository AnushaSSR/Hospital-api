const Report = require("../models/reports");

module.exports.filterByStatus = async function(req,res) {
    
    try {
        let status = req.params.status;
        console.log(status);

        let filteredReports = await Report.find({status: status}).sort("createdAt");
        console.log(filteredReports);

        if(!filteredReports.length){

            return res.json(409, {
                message: `No reports found for status '${status}' `,
               
            });
    
        }
        return res.json(409, {
            message: `Reports filtered by status '${status}' are`,
            data: {
                report: filteredReports
            }
        });
    } catch (err) {
        console.log("error", err);

        return res.json(500, {
            message: "Internal server error"
        });
    }

}