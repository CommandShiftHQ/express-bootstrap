const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my Jokes API!',
  });
};
const jokesController = (req, res) => {
  res.send({
    message: 'This is the all jokes endpoint!',
  });
};
const randomController = (req, res) => {
  res.send({
    message: 'This is the all jokes endpoint!',
  });
};
const random2Controller = (req, res) => {
  res.send({
    message: 'This is the all jokes endpoint!',
  });
};

module.exports = mainController, jokesController, randomController,random2Controller;