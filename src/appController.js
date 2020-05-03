// eslint-disable-next-line
const request = require('request');
const axios = require('axios');

const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my jokes API!',
  });
};

const jokesController = (req, res) => {
  // eslint-disable-next-line consistent-return
  request('https://api.icndb.com/jokes', (error, jokesApiResponse) => {
    if (error) {
      return res.status(error.statusCode).send({ error: error.message });
    }

    const parsedResponse = JSON.parse(jokesApiResponse.body);
    res.send({ jokes: parsedResponse.value });
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

// eslint-disable-next-line consistent-return
const personalJokeController = async (req, res) => {
  const { first, last } = req.params;

  try {
    const response = await axios.get(
      `https://api.icndb.com/jokes/random?firstName=${first}&lastName=${last}&exclude=[explicit]`,
    );

    return res.send({ personalJoke: response.data.value });
  } catch (error) {
    return res.status(error.statusCode).send({ error: error.message });
  }
};

module.exports = {
  mainController,
  jokesController,
  randomJokeController,
  personalJokeController,
};
