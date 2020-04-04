const request = require ('supertest');
const jwt = require('jsonwebtoken');
const { isObject, isNumber, isString, difference } = require('lodash');

const app = require ('../../server/koa');

const token = jwt.sign(
  { id: process.env.TEST_USER_ID, name: 'Test', status: 'active', paid: true },
  process.env.JWT_SECRET,
  {
    algorithm: 'HS512',
  }
);

describe('Me Endpoint', () => {
  it('should return me object', (done) => {
    request(app.callback())
      .get('/api/me')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body).toHaveProperty('me');

        done();
      });
  }, 10000);
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

        expect(res.body).toHaveLength(43);

        res.body.forEach(profession => {
          expect(profession).toHaveProperty('left');
          expect(profession).toHaveProperty('right');

          const professionFields = ['image', 'name', 'smallDescr'];
          expect(Object.keys(profession.left)).toEqual(expect.arrayContaining(professionFields));
          expect(Object.keys(profession.right)).toEqual(expect.arrayContaining(professionFields));
        });

        done();
      });
  });
});

describe('gollandResults Endpoint', () => {
  it('should return name, result and description in object for every type', (done) => {
    request(app.callback())
      .get('/api/gollandResults')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(Object.keys(res.body)).toHaveLength(6);

        expect(Object.values(res.body).every(val => isObject(val))).toBe(true);
        expect(Object.values(res.body).every(val => isString(val.descr))).toBe(true);
        expect(Object.values(res.body).every(val => isNumber(val.result))).toBe(true);

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
  it('should return array of dictionaries with information about types', (done) => {
    request(app.callback())
      .get('/api/klimovResults')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(res.body.every(cur => {
          return Object.values(cur).every(val => !isObject(val));
        })).toBe(true);
        // expect(res.body.every(cur => {
        //   return (difference(Object.keys(cur), 
        //     ['id', 'name', 'image', 'shortText', 'fullText', 'result']).length === 0);
        // })).toBe(true);

        done();
      });
  });
});

//=================Belbin=============================

describe('getBelbin Endpoint', () => {
  it('should return arrays with 8 strings - variants for Belbin test', (done) => {
    request(app.callback())
      .get('/api/getBelbin')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(res.body.every(cur => ( Array.isArray(cur) ))).toBe(true);
        expect(res.body.every(cur => ( cur.length === 8 ) )).toBe(true);
        expect(res.body.every(cur => {
          return cur.every(elem => {
            return Object.values(elem).every(element => isString(element));
          });
        })).toBe(true);

        done();
      });
  });
});

describe('belbinResults Endpoint', () => {
  it('should return array of dictionaries with information about types', (done) => {
    request(app.callback())
      .get('/api/belbinResults')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(res.body.every(cur => {
          return Object.values(cur).every(val => !isObject(val));
        })).toBe(true);
        // expect(res.body.every(cur => {
        //   return (difference(Object.keys(cur), ['id', 'name', 'image', 'descr', 'func', 'result']).length === 0);
        // })).toBe(true);

        done();
      });
  });
});

//=================DISK=============================

describe('getDisk Endpoint', () => {
  it('should return question and dictionary with variants of answer for Belbin test', (done) => {
    request(app.callback())
      .get('/api/getDisk')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(res.body.every(cur => {
          return (difference(Object.keys(cur), ['name', 'tasks']).length === 0);
        })).toBe(true);
        expect(res.body.every(cur => {
          return isString(cur.name);
        })).toBe(true);
        expect(res.body.every(cur => {
          return cur.tasks.every(elem => {
            return isString(elem);
          });
        })).toBe(true);

        done();
      });
  });
});

describe('diskResults Endpoint', () => {
  it('should return array of dictionaries with information about types', (done) => {
    request(app.callback())
      .get('/api/diskResults')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        expect(res.body.every(cur => {
          return Object.values(cur).every(val => !isObject(val));
        })).toBe(true);
        // expect(res.body.every(cur => {
        //   return (difference(Object.keys(cur), ['id', 'name', 'image', 'text', 'result']).length === 0);
        // })).toBe(true);

        done();
      });
  });
});

//=================Others=============================

describe('getProfession Endpoint', () => {
  const id = Math.floor(Math.random() * 92) + 1; // Random [1, 80]

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
  it('should return array of objects, in every object - array with directions', (done) => {
    request(app.callback())
      .get('/api/recommendations')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.statusCode).toEqual(200);
        res.body.forEach(elem => {
          expect(Object.keys(elem)).toEqual(expect.arrayContaining(['id', 'name', 'directions']));
          expect(Array.isArray(elem.directions)).toBe(true);
          expect(elem.directions).not.toHaveLength(0);
          elem.directions.forEach(dir => {
            expect(dir).toHaveProperty('name');
          });
        });

        done();
      });
  });
});
