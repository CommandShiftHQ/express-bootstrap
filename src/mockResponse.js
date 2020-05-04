const mockResponseJokes = {
  type: 'success',
  value: [
    {
      id: 1,
      joke: 'i am a joke',
      categories: [],
    },
    {
      id: 2,
      joke: 'i am another joke',
      categories: [],
    },
  ],
};

const mockResponseRandom = {
  type: 'success',
  value: {
    id: 115,
    joke: 'i am a random joke',
    categories: [],
  },
};

const mockResponsePersonal = {
  type: 'success',
  value: {
    id: 115,
    joke: 'random joke about manchester codes',
    categories: [],
  },
};


module.exports = { mockResponseJokes, mockResponseRandom, mockResponsePersonal}