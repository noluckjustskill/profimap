const { GollandResultsModel } = require('../../database');
const { mapKeys, omit } = require('lodash');
const keyDictionary = require('../../config/golland/gollandSkillsDictionary.json');

const GollandResultsController = async (ctx) => {
  const user = await GollandResultsModel.query().findOne({ userId: ctx.user.id }) || {};

  ctx.body = mapKeys(omit(user, ['id', 'userId']), (val, key) => keyDictionary[key]);
};

const GollandResultsRoute = '/gollandResults';

module.exports = {
  GollandResultsController,
  GollandResultsRoute,
};
