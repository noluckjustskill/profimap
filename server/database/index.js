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
const { Model, knexSnakeCaseMappers } = require('objection');
const UsersModel = require('./models/users');
const AuthUsersModel = require('./models/authUsers');
const GollandResultsModel = require('./models/golland/gollandResults');
const KlimovResultsModel = require('./models/klimov/klimovResults');
const GollandTasksModel = require('./models/golland/gollandTasks');
const KlimovTasksModel = require('./models/klimov/klimovTasks');
const GollandTypesModel = require('./models/golland/gollandTypes');
const KlimovTypesModel = require('./models/klimov/klimovTypes');
const GollandRecommendationsModel = require('./models/golland/gollandRecommendations');
const ProfessionsModel = require('./models/professions');

const knex = Knex({
  client: 'mysql', 
  connection: {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_USER_PASSWORD,
    database: DB_NAME
  },
  ...knexSnakeCaseMappers(),
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
  GollandResultsModel,
  GollandTasksModel,
  GollandTypesModel,
  GollandRecommendationsModel,
  KlimovResultsModel,
  KlimovTasksModel,
  KlimovTypesModel,
  ProfessionsModel
};
