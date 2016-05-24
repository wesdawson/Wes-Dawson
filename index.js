var express = require('express');
var app = express();
var path =require('path');

var nodemailer = require('nodemailer');

app.use(express.static('static'));

//serve static page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});


// Handle contact form POST data
app.post('/contact', function (req, res) {

  // Honeypot for spambots
  /*
  if (req.body.company) {
    res.render('contact', {
      title: 'Contact',
      err:    true,
      page:   'contact',
      type:   'empty',
      body:   req.body.email,
      msg:    'Spambot detected.',
      description:'spam'});
    return;
  }
  */

  // Check if all required fields are filled
  if (! req.body.name || ! req.body.email || ! req.body.message) {
    res.render('contact', {
      title: 'Contact',
      err:    true,
      page:   'contact',
      type:   'empty',
      body:   req.body.message,
      name:   req.body.name,
      email:  req.body.email,
      msg:    'Thanks!',
      description: 'e-mail fields'});
    return;
  }

  //Set up smpt mailer
  var mailOpts, smtpTrans;

  smtpTrans = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "wesley.s.dawson@gmail.com",
      pass: ""
    }
  });

  // Fill in mail options
  mailOpts = {
    from: req.body.name + '&lt;' + req.body.email + '&gt;', //Grab form data from request body object
    to: 'wesley.s.dawson@gmail.com',
    subject: 'Website contact',
    text: req.body.message + ' || NAME:' + req.body.name + ' || EMAIL:' + req.body.email
  };

  smtpTrans.sendMail(mailOpts, function (error, info) {

    // Eamil not sent
    if (error) {
      res.render('contact', {
        title: 'Contact',
        page: 'contact',
        type: 'error',
        description: 'email not successfully sent' });
    }
    // Email sent
    else {
      res.render('contact', {
        title: 'Contact',
        page: 'contact',
        type: 'success',
        description: 'email successful' });
    }
  });
});




app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
