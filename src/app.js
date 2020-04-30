const express = require('express');
const mainController = require('./controllers.js');
const jokesController = require('./controllers.js');

const app = express();

app.get('/', mainController);

app.get('/jokes', jokesController);

module.exports = app;
