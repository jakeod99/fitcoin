var express = require('express');
var router = express.Router();
var assetRouter = require('./assets')
var path = require('path');

// HTML References
router.get('/index', (req, res) =>{
    res.sendFile(path.resolve('../app/src/html/index.html'));
});

router.get('/profile', (req, res) =>{
    res.sendFile(path.resolve('../app/src/html/profile.html'));
});

router.get('/competitions', (req, res) =>{
    res.sendFile(path.resolve('../app/src/html/competitions.html'));
});

router.get('/inbox', (req, res) =>{
    res.sendFile(path.resolve('../app/src/html/inbox.html'));
});

router.use('/', assetRouter);

module.exports = router;