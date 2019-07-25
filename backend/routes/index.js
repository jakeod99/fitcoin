var express = require('express');
var router = express.Router();
var apiRouter = require('./api');

// / Endpoint
router.get('/', function(req, res) {
    res.render('index');
});

// /api/ Endpoint
router.use('/api', apiRouter)

module.exports = router;