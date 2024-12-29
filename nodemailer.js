var express = require('express')
var app=express();
//var formidable = require('formidable');

//app.set('view engine','pug')
//var router = express.Router();
/*app.get('/',function(req,res)
{
res.render('exp1',{title:'simple pug',message:'Hello world'})
}
)

app.get('/about',function(req,res){
    res.render('about'),
    {title:'about page',message:'message in about'}
});

*/
//app.get('/ma',function(req,res){
    //res.render('ma'),
    //{title:'about page',message:'message in about'}
    //console.log(req.query.mail);
    var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure:true,
  port:465,
  auth: {
    user: 'deenu.vengatesh999@gmail.com',
    pass: 'vengrohini'
  },
  tls:
  {rejectUnauthorized:false}
});

var mailOptions = {
  from: "deenu.vengatesh999@gmail.com",
  to: "abijithvelaga@gmail.com",
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
//});






app.listen(1330,function(){
  console.log('app listening')
 });
