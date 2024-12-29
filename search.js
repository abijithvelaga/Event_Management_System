'use strict';
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var router = express.Router();
var port = process.env.PORT || 1330;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = express.Router();
app.set('view engine', 'pug')

app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'app')));

app.get('/', function (req, res) {
    res.render('addlocation.pug');
    
});


app.post('/insert', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db('event');
        if (err) throw err;
        var myobj = { city: req.body.city1,
             venue: req.body.venue1,
             place: req.body.place1,
             address: req.body.address1,
             capacity:req.body.capacity1,
             
             description:req.body.des,
             special:req.body.spl };
        db.collection("location").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
           // console.log(req.body.address1);
           // console.log(req.body.city1);
            
        });
       
            


    });
});


app.listen(1330, function () {
    console.log('Sample app listening on 1337');
});
