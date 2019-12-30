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
const InvitedUsersModel = require('./models/invitedUsers');
const GollandResultsModel = require('./models/golland/gollandResults');
const KlimovResultsModel = require('./models/klimov/klimovResults');
const GollandTasksModel = require('./models/golland/gollandTasks');
const KlimovTasksModel = require('./models/klimov/klimovTasks');
const GollandTypesModel = require('./models/golland/gollandTypes');
const KlimovTypesModel = require('./models/klimov/klimovTypes');
const GollandRecommendationsModel = require('./models/golland/gollandRecommendations');
const ProfessionsModel = require('./models/professions');
const BelbinTasksModel = require('./models/belbin/belbinTasks');
const BelbinTypesModel = require('./models/belbin/belbinTypes');
const BelbinResultsModel = require('./models/belbin/belbinResults');
const DiskTasksModel = require('./models/disk/diskTasks');
const DiskTypesModel = require('./models/disk/diskTypes');
const DiskResultsModel = require('./models/disk/diskResults');

const knex = Knex({
  client: 'mysql', 
  connection: {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_USER_PASSWORD,
    database: DB_NAME
  },
  timezone: 'UTC',
  ...knexSnakeCaseMappers(),
  ...(isDev ? {
    log: {
      warn: (msg) => logger.log('warning', msg),
      error: (msg) => logger.log('error', msg),
      debug: (msg) => logger.log('info', msg),
    }
  } : {
    error: (msg) => logger.log('error', msg),
  }),
});

Model.knex(knex);

module.exports = {
  knex,
  UsersModel,
  InvitedUsersModel,
  GollandResultsModel,
  GollandTasksModel,
  GollandTypesModel,
  GollandRecommendationsModel,
  KlimovResultsModel,
  KlimovTasksModel,
  KlimovTypesModel,
  ProfessionsModel,
  BelbinTasksModel,
  BelbinTypesModel,
  BelbinResultsModel,
  DiskTasksModel,
  DiskTypesModel,
  DiskResultsModel,
};
