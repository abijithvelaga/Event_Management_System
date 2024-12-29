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

var client_id="";

app.get('/', function (req, res) {
    res.render('final_client_login.pug');
    
});

app.post('/forgot', function(req,res) {        //forgot password
    
res.render("confirmpass.pug");    


});

app.post('/forgot1',function(req,res){
    
    MongoClient.connect(url, function (err, client) {
        var db = client.db('event');
        if (err) throw err;
       var pas1=req.body.pass1;
       var pas2=req.body.pass2;
       if(pas1==pas2)
       {
         var myquery = { emailid:req.body.em};
         var newvalues = { $set: {password:pas1  } };
        
         db.collection("clientdetails").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          console.log(pas1);
          
         });
            res.render("final_client_login.pug");
       }
       else
       {
           console.log(pas1);
           console.log(pas2);
           res.render("confirmpass.pug",{message: 'password mismatch' });
        }
        
});

});

app.post('/clientaccount', function(req,res) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db('event');
        if (err) throw err;
        var myobj = { username1: req.body.user, password1: req.body.pass };
        var count=0;
        var countuser=0;
        

        db.collection("clientdetails").find({}).toArray(function (err, result) {//this is after putting into database,retrieving everything from it,,and storing in result 
            if (err) throw err;
           // console.log(result);
           if(result.length==0)
             {

                 res.render('final_client_login.pug',{message: 'Username not registered' });
                console.log("result length 0");
            }
           else{
            for(var i=0;i<result.length;i++)
            {
                if(myobj.username1 == result[i].emailid && myobj.password1 == result[i].password )
                {
                    console.log("client validation successful ");
                    console.log(result[i].emailid);
                    console.log(result[i].password);
                    client_id=result[i].cid;
                    res.render('client.pug');
                }
                else
                {
                    if(myobj.username1!=result[i].emailid)
                      countuser++;

                      console.log(" client validation Not successful ");
                      console.log(result[i].emailid);
                    console.log(result[i].password);
                    count++;
                    
                    
                }
            }
            if(countuser==result.length)
            res.render('final_client_login.pug',{message: 'Username not registered!' });
           else if(count==result.length){
               // if(confirm("Password and username not matched!"))
                res.render('final_client_login.pug',{message: 'The username and password is not matching!' });
               
            }
            
           }

         
        });



    });


  
   
});

/* ----------------------------------------personal info client---------------------------------------------------------------------*/
app.post('/personal',function(req,res){
    MongoClient.connect(url, function (err, client) {
        var db = client.db('event');
        if (err) throw err;
       
        db.collection("clientdetails").find({cid:client_id}).toArray(function (err, result) {//this is after putting into database,retrieving everything from it,,and storing in result 
            if (err) throw err;
            console.log(client_id);

            res.render('personalinfo_client_final.pug',{'result': result});
        });
    });
    });  

    /*------------------------------------------event details-------------------------------------------------------------*/
   
    app.post('/eventdetails',function(req,res){
       
        MongoClient.connect(url, function (err, client) {
            var db = client.db('event');
            if (err) throw err;
            db.collection("eventdetails").find({cid:client_id}).toArray(function (err, result) {//this is after putting into database,retrieving everything from it,,and storing in result 
                if (err) throw err;
    
                res.render('event_details_final.pug', { 'result': result });
                // res.render('page2.pug', {id: result[i].id, fname: result[i].fname, lname: result[i].lname, age: result[i].age, address: result[i].address, city: result[i].city, state: result[i].state, country: result[i].country, contact: result[i].contact});
                //}
    
            });
        });
         
     });


/*-----------------------------------------client sign up----------------------------------------------------------------*/
 app.post('/signup',function(req,res){
       
    res.render('clientsignup.pug');
     
 });

 var c='c';
//when sign up opens:
var i=2;                      //index for client signup
 app.post('/signupsubmit',function(req,res){

    MongoClient.connect(url, function (err, client) {
        var db = client.db('event');
        if (err) throw err;
        var myobj = { 
             fname: req.body.fname1,
             lname: req.body.lname1,
             emailid: req.body.email1,
             pno:req.body.pno1,
             apno:req.body.apno1,
             nationality:req.body.nationality1,
             dob:req.body.dob1,
             gender:req.body.gender1,
            paddr:req.body.paddr1,
            alt:req.body.alt1,
            password:req.body.password1 ,

            cid:c+i  
            };
        db.collection("clientdetails").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            i+=1;
          
            
        });

        
        
            
    });
    /*-----------nodemailer code for emailid verification----------*/
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
  to: req.body.email1,
  subject: 'From Eventspree',
  text:"Welcome to eventspree, You are now officially a part of the eventspree family,your Email Id has been registered!Thank you for registering!"
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
/*---------------------end of nodemailercode-------------*/

    res.render("final_client_login.pug");         //after signup,the user will  be redirected to the login page automatically
 });


app.post('/logout', function (req, res) {
    res.render('final_client_login.pug');
    });

app.post('/contact', function(req,res) {                   //contactus
    
    res.render('contact_us_main.pug');
});

app.post('/contactus2',function(req,res) {                   
    
    res.render('one.pug');
});

app.post('/sendmail_contact',function(req,res) {                   
    
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
  from: req.body.emailid,
  to: 'deenu.vengatesh999@gmail.com',
  subject: req.body.subject,
  text: req.body.ta
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

res.render('contact_us_main.pug');

});


app.post('/homepage',function(req,res){                           //home page for registration of all events
    res.render('homepage.pug');
});

app.post('/redirect_to_clientpage',function(req,res){                           //home page for registration of all events
    res.render('client.pug');
});


app.post('/form',function(req,res){                               
    var move=req.body.ren;
    if(move == 'edu')
    {
        res.render('testing.pug');                   //educational event
    } 
    else if(move == 'gov')
    {
        res.render('government.pug');                   //government event
    }
    else if(move == 'cor')
    {
        console.log("corpor");
        res.render('corporate.pug');               //corporate event
    }
    else if(move == 'fam')
    {
        console.log("fam"); 
        res.render('family.pug');                    //familty parties
    }
    else if(move == 'pro')
    {
        res.render('nonprofitable.pug');              //nonprofitable events
    }
    else if(move == 'aso')
    {
        res.render('associate.pug');              //associate events
    }
});

var eid1='e';
var e_index=2;   //index for event registration
app.post('/educational_submit', function(req,res) {                   
    
    console.log("inside educational form");


    MongoClient.connect(url, function (err, client) {
        var db = client.db('event');
        console.log("heyyyyyyy");
        if (err) throw err;
        var myobj = { 
                type: req.body.toe,
                area: req.body.toa, 
                sdate_time: req.body.startdatetime,
                edate_time: req.body.enddatetime,
                venue: req.body.venuedetails,
                budget: req.body.budget,
                people: req.body.people, 
                category: req.body.Category, 
                description: req.body.description,
                eid: eid1+e_index,   //the event id assigned to the respective client
                cid:client_id,    //the client id of the client 
            };
       /* db.collection("eventdetails").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 educational event inserted");
            e_index+=1;
        });*/
        
            
    });
   res.render('homepage.pug');

});


app.post('/nonprofitable_submit', function(req,res) {                   
    
    console.log("inside nonprofitable_event form");

    MongoClient.connect(url, function (err, client) {
        var db = client.db('event');
        if (err) throw err;
        var myobj = { 
                type: req.body.toe,
                area: req.body.toa, 
                sdate_time: req.body.startdatetime,
                edate_time: req.body.enddatetime,
                venue: req.body.venuedetails,
                budget: req.body.budget,
                //people: req.body.people, 
                //category: req.body.Category, 
                description: req.body.description,
                eid: eid1+e_index,   //the event id assigned to the respective client
                cid:client_id,    //the client id of the client 
            };
        db.collection("eventdetails").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 non-profitable event inserted");
            e_index+=1;
        });
            
    });

    res.render('homepage.pug');

});

app.post('/government_submit', function(req,res) {                   
    
    console.log("inside government form");

    MongoClient.connect(url, function (err, client) {
        var db = client.db('event');
        if (err) throw err;
        var myobj = { 
                type: req.body.toe,
                area: req.body.toa, 
                sdate_time: req.body.startdatetime,
                edate_time: req.body.enddatetime,
                venue: req.body.venuedetails,
                budget: req.body.budget,
                people: req.body.people, 
                //category: req.body.Category, 
                description: req.body.description,
                eid: eid1+e_index,   //the event id assigned to the respective client
                cid:client_id,    //the client id of the client 
            };
        db.collection("eventdetails").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 non-profitable event inserted");
            e_index+=1;
        });
            
    });

    res.render('homepage.pug');

});

app.post('/corporate_submit', function(req,res) {                   
    
    console.log("inside corporate form");

    MongoClient.connect(url, function (err, client) {
        var db = client.db('event');
        if (err) throw err;
        var myobj = { 
                company:req.body.companyname,
                type: req.body.toe,
                area: req.body.toa, 
                sdate_time: req.body.startdatetime,
                edate_time: req.body.enddatetime,
                venue: req.body.venuedetails,
                budget: req.body.budget,
                //people: req.body.people, 
                //category: req.body.Category, 
                description: req.body.description,
                eid: eid1+e_index,   //the event id assigned to the respective client
                cid:client_id,    //the client id of the client 
            };
        db.collection("eventdetails").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 non-profitable event inserted");
            e_index+=1;
        });
            
    });

    res.render('homepage.pug');

});

app.post('/family_submit', function(req,res) {                   
    
    console.log("inside family form");

    MongoClient.connect(url, function (err, client) {
        var db = client.db('event');
        if (err) throw err;
        var myobj = { 
                type: req.body.toe,
                area: req.body.toa, 
                sdate_time: req.body.startdatetime,
                edate_time: req.body.enddatetime,
                venue: req.body.venuedetails,
                budget: req.body.budget,
                people: req.body.people, 
                category: req.body.Category, 
                description: req.body.description,
                eid: eid1+e_index,   //the event id assigned to the respective client
                cid:client_id,    //the client id of the client 
            };
        db.collection("eventdetails").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 non-profitable event inserted");
            e_index+=1;
        });
            
    });

    res.render('homepage.pug');

});

app.post('/association_submit', function(req,res) {                   
    
    console.log("inside association form");
    MongoClient.connect(url, function (err, client) {
        var db = client.db('event');
        if (err) throw err;
        var myobj = { 
                type: req.body.toe,
                area: req.body.toa, 
                sdate_time: req.body.startdatetime,
                edate_time: req.body.enddatetime,
                venue: req.body.venuedetails,
                budget: req.body.budget,
                people: req.body.people, 
                //category: req.body.Category, 
                description: req.body.description,
                eid: eid1+e_index,   //the event id assigned to the respective client
                cid:client_id,    //the client id of the client 
            };
        db.collection("eventdetails").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 non-profitable event inserted");
            e_index+=1;
        });
            
    });
    res.render('homepage.pug');

});


/*-------------------------Feedback Form--------------------------------------*/

app.post('/feedback', function(req,res) {        
    
       res.render('feedbackform_main.pug');
    
 });

 app.post('/feedback2', function(req,res) {        
    
    var a,b,c;
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("event");
        
      //checking if the query is there or not
      var myobj = { 
                    friendly:req.body.friendly,
                    info:req.body.information,
                    behaviour:req.body.behaviour,
                    time:req.body.time,
                    flow:req.body.flow,
                    comment:req.body.comment,
                    cid:client_id
                };
                  dbo.collection("comment").insertOne(myobj, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    console.log(parseInt(req.body.time,10));
                    a=parseInt(req.body.time,10);
                  
                    //db.close();
                  });
                  a=parseInt(req.body.behaviour,10);
                  a=(a/5)*100;
                  b=parseInt(req.body.flow,10);
                  b=(b/3)*100;
                  c=parseInt(req.body.flow,10);
                  c=(c/3)*100;
                  console.log("Now a has value",a);
                  dbo.collection("rating").updateOne({eid:"e1"},{$inc:{behaviour:a,organisation:b,punctuality:c}});
                  console.log("Done");
          //db.close();
      });//mongoclient ends here

      res.render('client.pug');
 
});

/*---------------------End of feedback form-------------------------*/
    

app.listen(1337, function () {
    console.log('Sample app listening 1337');
});