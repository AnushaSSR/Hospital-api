const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reports');//reports controller

//get the list of reports filterd by status
router.get('/:status', reportsController.filterByStatus);

module.exports= router;

