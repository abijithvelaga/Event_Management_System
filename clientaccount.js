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
    res.render('client.pug');
});







app.post('/personal', function (req, res) {
    console.log("Event details clicked");
    //res.render('Page3.pug');


    MongoClient.connect(url, function (err, client) {
        var db = client.db('event');
        if (err) throw err;
        
        db.collection("clientdetails").find({}).toArray(function (err, result) {//this is after putting into database,retrieving everything from it,,and storing in result 
            if (err) throw err;
            console.log("Event Details Retrieved");

           

            var data1 = "<style>\n" + "table{\n" + "width: 50%;margin-left: 500px;margin-top: 100px;padding-left: 100px;margin-bottom:100px\n"+ "}\n"+
                "table,th,td{\n" + "text-align: center;padding: 10px;font-family:'Noto Serif SC',serif;;font-size: 25px;border-radius: 10px\n" + "}\n" +
                "tr:nth-child(even){\n" + "background-color:#0C0957;color: white\n" + "}\n" +
                "tr:nth-child(odd){\n" + "background-color:#E7B521;color: white\n" + "}\n" +
                "th{\n" + "background-color: #F1E1D1;color: #3a3d3c;height: 50px\n" + "}\n" +
                "th:hover{\n" + "background-color: #C0C0C0\n" + "}\n" +
                "h1{\n" + "margin-left:700px;padding-left: 150px;padding-right: 500px;font-size: 30px\n" + "}\n" +
                "body{\n" + "background-image: linear-gradient(to right, #6b6e70, #555759, #3a3b3d, #1d1d1e)\n" + "}\n" +
                "h2{\n" + "font-size: 40px;text-align: center;font-family: 'Lato', sans-serif;border-bottom: 5px solid #2fa2ef;border-width-left: 20%;border-width-right: 20%;padding-left: 40px;color: #53c1ed\n" + "}\n" +
                "button{\n" + "background-color:forestgreen; color:white; border:none; font-size:20px; padding:7px 25px; border-radius:50px; margin-left:50%; margin-top:-70% \n" + "}\n" +
                "</style>" +
                "<script>\n" + "function goBack(){ window.history.back();\n" + "}\n" + "</script>" +
                '<title>\n' + 'Event Details' + '</title>\n' +
                '</head>\n' +
                '<body>\n' +
                '<h1 position="center">'+'Educational Event Details'+'</h1>\n'+
                '<form>\n'+
                '<table>\n' +
                '<tr>' + "<th> First Name </th>\n" + '<td>' + result[0].fname+ '</td>' + "</tr>\n"+
                '<tr>' + "<th> Last Name </th>\n" + '<td>' + result[0].lname + '</td>' + "</tr>\n"+
                '<tr>' + "<th>  Email Id </th>\n" + '<td>' + result[0].emailid + '</td>' + "</tr>\n"+
                '<tr>' + "<th> Phone Number </th>\n" + '<td>' + result[0].pno + '</td>' + "</tr>\n"+
                '<tr>' + "<th> Alternate Phone Number </th>\n" + '<td>' + result[0].apno + '</td>' + "</tr>\n"+
                '<tr>' + "<th> Nationality </th>\n" + '<td>' + result[0].nationality + '</td>' + "</tr>\n" +
                '<tr>' + "<th> Date of birth </th>\n" + '<td>' + result[0].dob + '</td>' + "</tr>\n" +
                '<tr>' + "<th> Gender </th>\n" + '<td>' + result[0].gender + '</td>' + "</tr>\n" +
                '<tr>' + "<th> Permanent Address </th>\n" + '<td>' + result[0].paddr + '</td>' + "</tr>\n" +
                '<tr>' + "<th> Alternate Address </th>\n" + '<td>' + result[0].alt + '</td>' + "</tr>\n" +
                    '</table>\n' +
                    '<button onclick="goBack()">\n' + 'Previous!' + '</button>\n' +
                    '</form >\n' +
                    '</body >\n' +
                    '</html >\n';

            res.send(data1);
        });


    });
    });

    app.post('/logout', function (req, res) {
        res.render('final_client_login.pug');
        
    });
    
app.listen(port, function () {
    console.log('Sample app lsitining on 1337');
});

