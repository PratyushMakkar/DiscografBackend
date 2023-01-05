var express = require('express');
const {sequalize} = require('./sequelize/SequelConfig')
const cors = require('cors');

var id = require('./routes/id')
var wordcloud = require('./routes/wordcloud')

var app = express();

app.use('/id', id)
app.use('/wordcloud', wordcloud)
app.use(cors({
  origin: 'https://www.section.io'
}));

app.listen(2000, function () {
  console.log('UWEngKid backend listening on port 3000!');
});

