const request = require('request');

const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my Jokes API!',
  });
};

/* const jokesController = (req, res) => {
  res.send({
    message: 'This is the all jokes endpoint!',
  });
}; */

const jokesController = (req, res) => {
  request('https://api.icndb.com/jokes', (error, jokesApiResponse) => {
    if (error) {
      console.log(error);
    }
    const parsedResponse = JSON.parse(jokesApiResponse.body);
    res.send({ jokes: parsedResponse.value });
    //console.log(parsedResponse);
  });
  //
};
module.exports = { mainController, jokesController };
