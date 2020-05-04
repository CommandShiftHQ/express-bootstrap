/**
 * @jest-environment node
 */

const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');

const mockError = { statusCode: 500, message: 'Error responding' };
describe('GET / Homepage', () => {
  it('should respond with some homepage markup', done => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Welcome to my Jokes API Page!');
        done();
      });
  });
});
describe('GET /jokes', () => {
  it('GET /jokes should respond with all jokes', async () => {
    const mockResponse = {
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
    nock('https://api.icndb.com')
      .get('/jokes')
      .reply(200, mockResponse);

    request(app)
      .get('/jokes')
      .then(res => {
        nock('https://api.icndb.com')
          .get('/jokes')
          .reply(200, mockResponse);
        expect(res.statusCode).toEqual(200);
        expect(res.body.jokes).toEqual(mockResponse.value);
      });
  });
  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError(mockError);

    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual(mockError.message);
      });
  });
});

describe('GET /jokes/random', () => {
  it('GET /jokes/random should respond with a random joke', async () => {
    const mockResponse = {
      type: 'success',
      value: {
        id: 115,
        joke: 'i am a random joke',
        categories: [],
      },
    };
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .reply(200, mockResponse);

    request(app)
      .get('/jokes/random')
      .then(res => {
        nock('https://api.icndb.com')
          .get('/jokes/random')
          .reply(200, mockResponse);

        expect(res.statusCode).toEqual(200);
        expect(res.body.randomJoke).toEqual(mockResponse.value);
      });
  });
  it('should respond with an error message if something goes wrong', async () => {
    // const mockError = { statusCode: 500, message: 'Error responding' };
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError(mockError);

    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual(mockError.message);
      });
  });
});

describe('GET /jokes/random/personal', () => {
  it('GET /jokes/random/personal should respond with a personal joke', async () => {
    const mockResponse = {
      type: 'success',
      value: {
        id: 115,
        joke: 'random joke about manchester codes',
        categories: [],
      },
    };
    nock('https://api.icndb.com')
      .get('/jokes/random') // personal
      .query({ exclude: '[explicit]', firstName: 'first', lastName: 'last' })
      .reply(200, mockResponse);

    request(app)
      .get('/jokes/random/personal/first/last')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.personalJoke).toEqual(mockResponse.value);
      });
  });

  it('should respond with an error message if something goes wrong', async () => {
    // const mockError = { statusCode: 500, message: 'Error responding' };
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'first', lastName: 'last' })

      .replyWithError(mockError);

    request(app)
      .get('/jokes/random/personal/first/last')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual(mockError.message);
      });
  });
});
