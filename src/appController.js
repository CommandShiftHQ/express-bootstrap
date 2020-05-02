const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my jokes API!',
  });
};
const jokesController = (req, res) => {
  return res.status(200).json({ message: 'This is the all jokes endpoint' });
};
const randomController = (req, res) => {
  return res.status(200).json({ message: 'This is a random joke endpoint' });
};
const personalController = (req, res) => {
  const { first } = req.params;
  const { last } = req.params;
  return res.status(200).json({ message: `This is a jokes endpoint for ${first} ${last}` });
};

module.exports = {
  mainController,
  jokesController,
  randomController,
  personalController,
};
