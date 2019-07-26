var express = require('express');
var router = express.Router();
var path = require('path');

var users = [
    {
        "username": "Jake",
        "avgSteps": 3000,
        "pubKey": "0x0000000000",
        "picFile": "jakepic.jpg"
    },
    {
        "username": "Alex",
        "avgSteps": 4000,
        "pubKey": "0x0000000001",
        "picFile": "alexpic.jpg"
    },
    {
        "username": "Julia",
        "avgSteps": 5000,
        "pubKey": "0x0000000002",
        "picFile": "profilepic.jpg"
    },
    {
        "username": "Nicole",
        "avgSteps": 6000,
        "pubKey": "0x0000000003",
        "picFile": "nicolepic.jpg"
    }
];

currentUser = ""

router.get('/all', (req, res) =>{
    res.json(users);
});

router.get('/:id', (req, res) =>{
    id = req.params.id;
    res.json(users.find( (user) =>{
        return user.username == id;
    }));
});

router.post('/:id', (req, res) =>{
    currentUser = req.params.id;
});

router.get('/current', (req, res) =>{
    res.json(users.find( (user) =>{
        return user.username == currentUser;
    }));
});



module.exports = router;