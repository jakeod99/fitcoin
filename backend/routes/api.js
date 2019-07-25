var express = require('express');
var router = express.Router();

// GET /api/
router.get('/hey', (req, res) => {
    res.send("API GET HEY");
});

router.get('/profile', (req, res) =>{
    var path = require('path');
    res.sendFile(path.resolve('../app/src/html/profile.html'));
});

module.exports = router;