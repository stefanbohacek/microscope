const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Routes
app.use('/', require('./routes/index.js'))

module.exports = app;
