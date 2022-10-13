const express = require('express');
const router = express.Router();
const passport= require('passport');//for authentication
const patientsController = require('../controllers/patients');//patients controller
const { session } = require('passport');

//protected with jwt authentication,route for doctor to register patient 
router.post('/register', passport.authenticate('jwt', {session:false}), patientsController.register);
//protected with jwt authentication,route for doctor to create report for a patient 
router.post('/:id/create_report', passport.authenticate('jwt', {session:false}), patientsController.createReport);
//route to fetch all reports of a particular patient
router.get('/:id/all_report',patientsController.allReports);

module.exports= router;
