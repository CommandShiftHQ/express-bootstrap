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

const personalController = async (req, res) => {
  const { first, last } = req.params;

  try {
    const response = await axios.get(
      `https://api.icndb.com/jokes/random?firstName=${first}&lastName=${last}&exclude=[explicit]`,
    );

    return res.send({ personalJoke: response.data.value });
  } catch (error) {
    // eslint-disable-next-line
        console.log(error);
  }
};

module.exports = {
  mainController,
  jokesController,
  randomController,
  personalController,
};
