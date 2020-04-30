const express = require('express');

const app = express();

const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my Jokes API!',
  });
};
app.get('/', mainController);

module.exports = app;
