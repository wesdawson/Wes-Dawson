var express = require('express');
var app = express();
var path =require('path');

//serve static page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/app/public/index.html'));
});


app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
