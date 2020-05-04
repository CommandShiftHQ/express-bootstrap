const request = require('request');
const axios = require('axios');

const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my Jokes API!',
  });
};

const jokesController = (req, res) => {
  request('https://api.icndb.com/jokes', (error, jokesApiResponse) => {
    if (error) {
      console.log(error);
    }
    const parsedResponse = JSON.parse(jokesApiResponse.body);
    res.send({ jokes: parsedResponse.value });
    // console.log(jokesApiResponse.body);
  });
};
/*
const randomJokeController = (req, res) => {
  axios
    .get('https://api.icndb.com/jokes/random?exclude=[explicit]')
    .then(response => res.send({ randomJoke: response.data.value }))

    .catch(error => {
      console.log(error);
    });
}; */

const randomJokeController = async (req, res) => {
  try {
    const response = await axios.get(`https://api.icndb.com/jokes/random?exclude=[explicit]`);
    return res.send({ randomJoke: response.data.value });
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

module.exports = { mainController, jokesController, randomJokeController, personalJokeController };
