const express = require('express');
const mainController = require('./controllers.js');
const jokesController = require('./controllers.js');
const randomController = require('./controllers.js');
const random2Controller = require('./controllers.js');

const app = express();

app.get('/', mainController);

app.get('/jokes', jokesController);

app.get('/jokes/random', randomController);

app.get('/joke/random/personal/:first/:last', random2Controller);

module.exports = app;
