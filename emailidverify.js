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
    res.render('clientsignup.pug');
    
});

app.post('/done',function(req,res) {

    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    port:587,
    auth: {
    user: 'deenu.vengatesh999@gmail.com',
    pass: 'vengrohini'
    }
    });

var mailOptions = {
  from: 'deenu.vengatesh999@gmail.com',
  to: req.body.email,
  subject: 'From Eventspree',
  text:"Welcome to eventspree, You are now officially a part of the eventspree family!Thank you for registering!"
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

      });

app.listen(port, function () {
    console.log('Sample app lsitining on 1337');
});
