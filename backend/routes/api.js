var express = require('express');
var router = express.Router();

// GET /api/
router.get('/hey', (req, res) => {
    res.send("API GET HEY");
});

router.get('/index', (req, res) =>{
    var path = require('path');
    res.sendFile(path.resolve('../app/src/html/index.html'));
});

router.get('/profile', (req, res) =>{
    var path = require('path');
    res.sendFile(path.resolve('../app/src/html/profile.html'));
});

router.get('/competitions', (req, res) =>{
    var path = require('path');
    res.sendFile(path.resolve('../app/src/html/competitions.html'));
});

router.get('/inbox', (req, res) =>{
    var path = require('path');
    res.sendFile(path.resolve('../app/src/html/inbox.html'));
});

module.exports = router;