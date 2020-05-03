const express = require('express');
const controller = require('./appController');

const app = express();
app.use(express.json());

app.get('/', controller.mainController);
app.get('/jokes', controller.jokesController);
app.get('/jokes/random', controller.randomJokeController);
app.get('/jokes/random/personal/:first/:last', controller.personalJokeController);

module.exports = app;
