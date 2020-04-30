const express = require('express');
const {mainController, jokesController} = require('./controllers.js');

const app = express();

app.get('/', mainController);

app.get('/jokes/*', jokesController);

module.exports = app;
