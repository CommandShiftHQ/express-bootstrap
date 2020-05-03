const express = require('express');
const controller = require('./appController');

const app = express();
app.use(express.static('public'));
app.use(express.json());

app.get('/jokes', controller.jokesController);
app.get('/jokes/random', controller.randomJokeController);
app.get('/jokes/random/personal/:first/:last', controller.personalJokeController);

module.exports = app;
