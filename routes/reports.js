const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reports');

router.get('/:status', reportsController.filterByStatus);

module.exports= router;

