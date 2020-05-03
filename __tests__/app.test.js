/**
 * @jest-environment node
 */

const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');

describe('GET / Homepage', () => {
  it('should respond with some homepage markup', done => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Welcome to my jokes API!');
        done();
      });
  });
});

describe('GET / jokes', () => {
  it('GET / should serve all jokes!', done => {
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
        expect(res.statusCode).toEqual(200);
        expect(res.body.jokes).toEqual(mockResponse.value);
        done();
      });
  });
  it('should responde with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError({ statusCode: 500, message: 'huge error' });

    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
        done();
      });
  });
});

describe('GET / jokes/random', () => {
  it('GET / should serve a random joke!', done => {
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
        expect(res.statusCode).toEqual(200);
        expect(res.body.randomJoke).toEqual(mockResponse.value);
        done();
      });
  });
  it('should responde with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError({ statusCode: 500, message: 'huge error' });

    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
        done();
      });
  });
});

describe('GET / jokes/random/personal', () => {
  it('GET / should serve a personalised joke for {first} {last}!', async () => {
    const mockResponse = {
      type: 'success',
      value: {
        id: 115,
        joke: 'random joke about manchester codes',
        categories: [],
      },
    };

    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'first', lastName: 'last' })
      .reply(200, mockResponse);
    const res = await request(app).get('/jokes/random/personal/first/last');
    expect(res.statusCode).toEqual(200);
    expect(res.body.personalJoke).toEqual(mockResponse.value);
  });
  it('should responde with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'first', lastName: 'last' })
      .replyWithError({ statusCode: 500, message: 'Bad request' });

    const res = await request(app).get('/jokes/random/personal/first/last');
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual('Bad request');
  });
});
