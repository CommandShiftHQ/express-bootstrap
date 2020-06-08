const express = require('express');
const {
  jokesController,
  randomJokeController,
  personalJokeController,
} = require('./controllers.js');

const app = express();
app.use(express.static('./public'));

//app.get('/', mainController);

app.get('/jokes', jokesController);

app.get('/jokes/random', randomJokeController);

app.get('/jokes/random/personal/:first/:last', personalJokeController);

module.exports = app;
