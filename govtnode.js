'use strict';
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var router = express.Router();
var port = process.env.PORT || 1337;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = express.Router();
app.set('view engine', 'pug')

app.use(bodyParser.json());


// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'app')));

app.get('/', function (req, res) {
    res.render('govt.pug');
   });



app.post('/insert', function (req, res) {
    console.log("Inside Save" + req.body.cid);

    MongoClient.connect(url, function (err, client) {
        var db = client.db('event');
        if (err) throw err;
        var myobj = { : req.body., customername: req.body.cname, contactname: req.body.coname, country: req.body.cotry };
        db.collection("location").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        });
        db.collection("customers").find({}).toArray(function (err, result) {//this is after putting into database,retrieving everything from it,,and storing in result 
            if (err) throw err;
            console.log(result);

            var data = "<style>\n" + "th,td{\n" + "border-collapse: collapse; background-color:#623B10\n" + "}\n" + "</style>" + '<table style=\"width:30%\">\n' + '<tr>' +
                "<th>CUSTOMER ID</th>\n" + "<th>COMPANY NAME</th>\n" + "<th>CONTACT NAME</th>\n" + "<th>COUNTRY</th>\n" + "/<tr>";
            for (var i = 0; i < result.length; i++) {
                data = data + '<tr><th>' + result[i].customerid + '<th>' + result[i].customername + '<th>' + result[i].contactname + '<th>' + result[i].country + '<tr>' + "\n";
            }

            res.send(data);

        });



    });
});

app.listen(port, function () {
    console.log('Sample app lsitining on 1337');
});
