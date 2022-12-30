var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/', function (req, res) {
  res.contentType('application/json');
  
});

app.listen(3000, function () {
  console.log('UWEngKid backend listening on port 3000!');
});