const express = require('express');
const router = express.Router();
const passport= require('passport');
const patientsController = require('../controllers/patients');
const { session } = require('passport');

router.post('/register', passport.authenticate('jwt', {session:false}), patientsController.register);
router.post('/:id/create_report', passport.authenticate('jwt', {session:false}), patientsController.createReport);
router.get('/:id/all_report',patientsController.allReports);


module.exports= router;
