var express = require('express');
var router = express.Router();
var path = require('path');

// CSS References
router.get('/styles.css', (req, res) =>{
    res.sendFile(path.resolve('../app/src/styles/styles.css'));
});

// JPG References
router.get('/images/:name', (req, res) => {
    res.sendFile(path.resolve(`../app/src/images/profilepic.jpg`));
});

// JavaScript References
router.get('/new_competition.js', (req, res) =>{
    res.sendFile(path.resolve('../app/src/js/new_competition.js'));
});
router.get('/betManager.js', (req, res) => {
    res.sendFile(path.resolve('../app/src/js/betManager.js'));
});
router.get('/inbox.js', (req, res) => {
    res.sendFile(path.resolve('../app/src/js/inbox.js'));
});
router.get('/competitions.js', (req, res) => {
    res.sendFile(path.resolve('../app/src/js/competitions.js'));
});

module.exports = router;