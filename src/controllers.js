const request = require('request');
const axios = require('axios');

/*
const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my Jokes API!',
  });
};*/

const jokesController = async (req, res) => {
  try {
    const response = await axios.get('https://api.icndb.com/jokes');
    return res.send({ jokes: response.data.value });
  } catch (error) {
    res.status(error.statusCode).send({ error: error.message });
  }
};

const randomJokeController = async (req, res) => {
  try {
    const response = await axios.get(`https://api.icndb.com/jokes/random?exclude=[explicit]`);
    return res.send({ randomJoke: response.data.value });
  } catch (error) {
    res.status(error.statusCode).send({ error: error.message });
  }
};

const personalJokeController = async (req, res) => {
  const { first, last } = req.params;
  try {
    const response = await axios.get(
      `https://api.icndb.com/jokes/random?firstName=${first}&lastName=${last}&exclude=[explicit]`,
    );

    return res.send({ personalJoke: response.data.value });
  } catch (error) {
    // end try
    res.status(error.statusCode).send({ error: error.message });
  }
};

module.exports = {  jokesController, randomJokeController, personalJokeController };
