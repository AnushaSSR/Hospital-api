const express = require('express');
const router = express.Router();
//doctors controller
const doctorsController = require('../controllers/doctors');

//route to register anew doctor
router.post('/register', doctorsController.register);
//route for doctor log in 
router.post('/login', doctorsController.login);

module.exports = router;