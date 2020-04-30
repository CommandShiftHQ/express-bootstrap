const express = require('express');
const mainController = require('./controllers.js')

const app = express();

app.get('/', mainController);

module.exports = app;
