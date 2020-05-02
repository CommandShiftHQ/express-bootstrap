const express = require('express');
const controller = require('./appController');

const app = express();
app.use(express.json());

app.get('/', controller.mainController);
app.get('/jokes', controller.jokesController);
app.get('/joke/random', controller.randomController);
app.get('/joke/random/personal/:first/:last', controller.personalController);

module.exports = app;
