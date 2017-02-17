const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const index = require('./routes/api');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

module.exports = app;
