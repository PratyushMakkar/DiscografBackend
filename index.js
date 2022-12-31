var express = require('express');
const {sequalize} = require('./sequelize/SequelConfig')

var id = require('./routes/id')
var wordcloud = require('./routes/wordcloud')

var app = express();

app.use('/id', id)
app.use('/wordcloud', wordcloud)

app.listen(3000, function () {
  console.log('UWEngKid backend listening on port 3000!');
});

