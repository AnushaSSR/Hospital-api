const express = require('express');
const router = express.Router();

router.use('/doctors', require('./doctors'));
router.use('/patients', require('./patients'));
router.use('/reports', require('./reports'));

router.all('/', function(req,res) {
    return res.json(400, {
        message: 'route not available. Check out the documentation for valid routes'
    });
});

module.exports = router;