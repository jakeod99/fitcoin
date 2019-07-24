const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var indexRouter = require('./routes');

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('listening on port 3000');
});

app.use('/', indexRouter)

// const mongoClient = require('mongodb').MongoClient;
// const mongodb = require('mongodb');
// var db;

// var url = 'mongodb://localhost:27017/adApp';

// MongoCleint.connect(url, (err, database) => {
//     if (err)
//         return console.log(err);
//     db = database;
//     app.listen(3000, () => {
//         console.log('listening on 3000');
//     })
// });