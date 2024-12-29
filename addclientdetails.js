var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var router = express.Router();
var port = process.env.PORT || 7000;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = express.Router();
app.set('view engine', 'pug')

app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'app')));

app.get('/', function (req, res) {
    res.render('clientdetails.pug');
    
});


app.post('/insert', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db('event');
        if (err) throw err;
        var myobj = { 
             fname: req.body.fname1,
             lname: req.body.lname1,
             emailid: req.body.email1,
             pno:req.body.pno1,
             apno:req.body.ano1,
             nationality:req.body.nationality1,
             dob:req.body.dob1,
             gender:req.body.gender1,
            paddr:req.body.paddress1,
            alt:req.body.altaddr1,
            password:req.body.password1   
            };
        db.collection("clientdetails").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
          
            
        });
        
            


    });
});


app.listen(port, function () {
    console.log('Sample app listening on 1330');
});
