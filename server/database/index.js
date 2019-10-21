require('dotenv').config();

// Init db connection
const isDev = process.env.NODE_ENV === 'development';
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_USER_PASSWORD,
  DB_NAME,
} = process.env;

const Knex = require('knex');
const { Model } = require('objection');
const UsersModel = require('./models/users');
const AuthUsersModel = require('./models/authUsers');

const knex = Knex({
  client: 'mysql', 
  connection: {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_USER_PASSWORD,
    database: DB_NAME
  },
  ...(isDev ? {
    log: {
      warn: console.warn,
      error: console.error,
      debug: console.log,
    }
  } : {}),
});

Model.knex(knex);

module.exports = {
  knex,
  UsersModel,
  AuthUsersModel,
};
