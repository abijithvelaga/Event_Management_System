
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var router = express.Router();
var port = process.env.PORT || 8401;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = express.Router();
app.set('view engine', 'pug')

app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'app')));

app.get('/', function (req, res) {
    res.render('filterpug.pug');
    
});
app.post('/filterlocation', function (req, res) {
   var fil1=req.body.c1v1?"chennai":"";
   var fil2=req.body.c1v2?"mumbai":"";
   var fil3=req.body.c1v3?"delhi":"";

   var fil11=req.body.c2v1?"chennai":"";
   var fil22=req.body.c2v2?"mumbai":"";
   var fil33=req.body.c2v3?"delhi":"";

   MongoClient.connect(url, { useNewUrlParser: true },function (err, client) {
    var db = client.db('event');
    if (err) throw err;

    db.collection("location").find({ city: { $in: [ fil1,fil2,fil3 ] } } ).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
       
      });

});
});

app.listen(8080, function () {
    console.log('Sample app listening on 1337');
});
