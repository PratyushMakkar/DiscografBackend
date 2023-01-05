var express = require('express');
const {sequalize} = require('./sequelize/SequelConfig')
const cors = require('cors');

const PORT = process.env.PORT

var id = require('./routes/id')
var wordcloud = require('./routes/wordcloud')

var app = express();

app.use('/id', id)
app.use('/wordcloud', wordcloud)
app.use(cors({
  origin: '0.0.0.0'
}));

app.listen(PORT, function () {
  console.log(`UWEngKid backend listening on port ${PORT}`);
});

