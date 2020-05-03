// eslint-disable-next-line
const request = require('request');
const axios = require('axios');

const jokesController = (req, res) => {
  request('https://api.icndb.com/jokes', (error, jokesApiResponse) => {
    if (error) {
      return res.status(error.statusCode).send({ error: error.message });
    }

    const parsedResponse = JSON.parse(jokesApiResponse.body);
    return res.send({ jokes: parsedResponse.value });
  });
};

const randomJokeController = (req, res) => {
  axios
    .get('https://api.icndb.com/jokes/random?exclude=[explicit]')
    .then(response => res.send({ randomJoke: response.data.value }))
    .catch(error => {
      return res.status(error.statusCode).send({ error: error.message });
    });
};

const personalJokeController = (req, res) => {
  const { first, last } = req.params;

  axios
    .get(
      `https://api.icndb.com/jokes/random?firstName=${first}&lastName=${last}&exclude=[explicit]`,
    )
    .then(response => res.send({ personalJoke: response.data.value }))
    .catch(error => {
      return res.status(error.statusCode).send({ error: error.message });
    });
};

module.exports = {
  jokesController,
  randomJokeController,
  personalJokeController,
};
