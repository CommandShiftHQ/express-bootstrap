const express = require('express');
const controller = require('./appController');

const app = express();
app.use(express.json());

app.get('/', controller.mainController);
app.get('/jokes', controller.jokesController);
app.get('/jokes/random', controller.randomController);
app.get('/jokes/random/personal/:first/:last', controller.personalController);

module.exports = app;
