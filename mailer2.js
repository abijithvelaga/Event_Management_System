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
  to: 'deenu.vengatesh999@gmail.com',
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