const express = require('express');
const {mainController, jokesController, randomJokeController, personalJokeController} = require('./controllers.js');

const app = express();

app.get('/', mainController);

app.get('/jokes', jokesController);

app.get('/jokes/random', randomJokeController);

app.get('/jokes/personal/:first/:last', personalJokeController);

module.exports = app;
