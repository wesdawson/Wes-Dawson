var express = require('express');
var app = express();
var path =require('path');

app.use(express.static('static'));

//serve static page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
