// eslint-disable-next-line
const request = require('request');
const axios = require('axios');

const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my jokes API!',
  });
};

const jokesController = (req, res) => {
  request('https://api.icndb.com/jokes', (error, jokesApiResponse) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    const parsedResponse = JSON.parse(jokesApiResponse.body);
    res.send({ jokes: parsedResponse.value });
  });
};

const randomController = (req, res) =>
  axios
    .get('https://api.icndb.com/jokes/random?exclude=[explicit]')
    .then(response => res.send({ randomJoke: response.data.value }))
    .catch(error => {
      // eslint-disable-next-line
      console.log(error);
    });

const personalController = (req, res) => {
  const { first } = req.params;
  const { last } = req.params;
  return res.status(200).send({ message: `This is a jokes endpoint for ${first} ${last}` });
};

module.exports = {
  mainController,
  jokesController,
  randomController,
  personalController,
};
