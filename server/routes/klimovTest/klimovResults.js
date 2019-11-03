const { KlimovResultsModel } = require('../../database');
const { mapKeys, omit } = require('lodash');
const keyDictionary = require('../../config/klimov/klimovSkillsDictionary.json');

const KlimovResultsController = async (ctx) => {
  const user = await KlimovResultsModel.query().findOne({ userId: ctx.user.id }) || {};

  ctx.body = mapKeys(omit(user, ['id', 'userId']), (val, key) => keyDictionary[key]);
};

const KlimovResultsRoute = '/klimovResults';

module.exports = {
  KlimovResultsController,
  KlimovResultsRoute,
};
