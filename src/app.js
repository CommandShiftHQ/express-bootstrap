const express = require('express');
const {mainController, jokesController, randomJokeController} = require('./controllers.js');

const app = express();

app.get('/', mainController);

app.get('/jokes', jokesController);

app.get('/jokes/random', randomJokeController);

module.exports = app;
