var express = require('express');
var router = express.Router();

// GET /api/
router.get('/hey', (req, res) => {
    res.send("API GET HEY")
});

module.exports = router;