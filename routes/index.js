const express = require('express');
const router = express.Router();

router.use('/doctors', require('./doctors'));//use doctors route
router.use('/patients', require('./patients'));//use patients route
router.use('/reports', require('./reports'));//use reports route

//Message to user when trying to access with the / route
router.all('/', function(req,res) {
    return res.json(400, {
        message: 'route not available. Check out the documentation for valid routes'
    });
});

module.exports = router;