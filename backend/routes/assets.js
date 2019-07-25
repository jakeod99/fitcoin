var express = require('express');
var router = express.Router();
var path = require('path');

// CSS References
router.get('/styles.css', (req, res) =>{
    res.sendFile(path.resolve('../app/src/styles/styles.css'));
});

// JPG References
router.get('/profilepic.jpg', (req, res) => {
    res.sendFile(path.resolve('../app/src/images/profilepic.jpg'));
});

// JavaScript References
router.get('/inbox.js', (req, res) =>{
    res.sendFile(path.resolve('../app/src/js/inbox.js'));
});

module.exports = router;