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
  it('should return name, result and description in object for every type', (done) => {
    request(app.callback())
      .get('/api/gollandResults')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(Object.values(res.body).every(val => isObject(val))).toBe(true);
        expect(Object.values(res.body).every(val => isString(val.name))).toBe(true);
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
  it('should return question and dictionary with variants of anwer for Belbin test', (done) => {
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

// TODO: FIXME
// describe('recommendations Endpoint', () => {
//   it('should return array of dictionaries with recommended professions', (done) => {
//     request(app.callback())
//       .get('/api/recommendations')
//       .set('Authorization', token)
//       .expect(200)
//       .end((err, res) => {
//         if (err) done(err);

//         expect(res.statusCode).toEqual(200);
//         expect(res.body.every(cur => {
//           return Object.values(cur).every(val => !isObject(val));
//         })).toBe(true);
//         expect(res.body.every(cur => {
//           return (difference(Object.keys(cur), ['id', 'name', 'image', 'smallDescr']).length === 0);
//         })).toBe(true);

//         done();
//       });
//   });
// });
