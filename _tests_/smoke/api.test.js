const request = require ('supertest');
const app = require ('../../server/koa');
const { isObject, isNumber, isString, difference } = require('lodash');

let token = '';
const testUser = {
  email: 'testuser@gmail.com',
  password: '12345'
};

describe('Login Endpoint', () => {
  it('shold return token', (done) => {
    request(app.callback())
      .post('/auth/login')
      .send(testUser)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body).toHaveProperty('token');
        token = res.body.token;

        done();
      });
  });
});

//=================Golland============================

describe('getGolland Endpoint', () => {
  it('should return pairs of professions for Golland test', (done) => {
    request(app.callback())
      .get('/api/getGolland')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body.every(cur => ( cur.length === 2 ))).toBe(true);
        expect(res.body.every(cur => {
          return cur.every(elem => {
            return (difference(Object.keys(elem), ['name', 'image', 'descr']).length === 0);
          });
        })).toBe(true);
        expect(res.body.every(cur => {
          return cur.every(elem => {
            return Object.values(elem).every(element => isString(element));
          });
        })).toBe(true);

        done();
      });
  });
});

describe('gollandResults Endpoint', () => {
  it('should return dictionary with number for every type', (done) => {
    request(app.callback())
      .get('/api/gollandResults')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(Object.values(res.body).every(val => isNumber(val))).toBe(true);

        done();
      });
  });
});

describe('gollandProfile Endpoint', () => {
  it('should return information about suitable type', (done) => {
    request(app.callback())
      .get('/api/gollandProfile')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name');
        expect(isString(res.body.name)).toBe(true);
        expect(res.body).toHaveProperty('description');
        expect(isString(res.body.description)).toBe(true);
        expect(res.body).toHaveProperty('recommendations');
        expect(isObject(res.body.recommendations)).toBe(true);
        expect(res.body.recommendations.every(cur => {
          return Object.values(cur).every(val => !isObject(val));
        })).toBe(true);

        done();
      });
  });
});

//=================Klimov=============================

describe('getKlimov Endpoint', () => {
  it('should return pairs of professions for Klimov test', (done) => {
    request(app.callback())
      .get('/api/getKlimov')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(res.body.every(cur => ( cur.length === 2 ) )).toBe(true);
        expect(res.body.every(cur => {
          return cur.every(elem => {
            return Object.values(elem).every(element => isString(element));
          });
        })).toBe(true);
        expect(res.body.every(cur => {
          return cur.every(elem => (difference(Object.keys(elem), ['name']).length === 0));
        }));

        done();
      });
  });
});

describe('klimovResults Endpoint', () => {
  it('should return dictionary with information about suitable type', (done) => {
    request(app.callback())
      .get('/api/klimovResults')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(Object.values(res.body).every(val => !isObject(val))).toBe(true);

        done();
      });
  });
});

//=================Others=============================

describe('getProfession Endpoint', () => {
  const id = Math.floor(Math.random() * 80) + 1; // Random [1, 80]

  it(`should return dictionary with description of profession with id = ${id}`, (done) => {
    request(app.callback())
      .get(`/api/getProfession?id=${id}`)
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(Object.values(res.body).every(val => !isObject(val))).toBe(true);
        expect(res.body.id).toBe(id);

        done();
      });
  });
});

describe('recommendations Endpoint', () => {
  it('should return array of dictionaries with recommended professions', (done) => {
    request(app.callback())
      .get('/api/recommendations')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(res.body.every(cur => {
          return Object.values(cur).every(val => !isObject(val));
        })).toBe(true);
        expect(res.body.every(cur => {
          return (difference(Object.keys(cur), ['id', 'name', 'image', 'smallDescr']).length === 0);
        })).toBe(true);

        done();
      });
  });
});
