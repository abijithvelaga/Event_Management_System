
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

//import alert from 'alert-node';

app.get('/', function (req, res) {
    res.render('final_adminlogin.pug');
});



app.post('/insert', function (req, res) {
    

    MongoClient.connect(url, function (err, client) {
        var db = client.db('login');
        if (err) throw err;
        var myobj = { username1: req.body.user, password1: req.body.pass };
        
        db.collection("unamepwd").find({}).toArray(function (err, result) {//this is after putting into database,retrieving everything from it,,and storing in result 
            if (err) throw err;
           // console.log(result);

         for(var i=0;i<result.length;i++)
         {
             if(myobj.username1 == result[i].username1 && myobj.password1 == result[i].password1 )
             {
                 console.log(" validation successful ");
                 var data="admin login successful";
                 res.send(data);
             }
             else
             {
                   console.log(" validation Not successful ");
                 var data = "admin login Not successful";
                 console.log(data);
                 res.render('final_adminlogin.pug');
                 //popupS.alert({
                   // content: 'Hello!'
                //});
             }
         }
        });



    });
});


app.listen(8080, function () {
    console.log('Sample app lsitining on 1337');
});

