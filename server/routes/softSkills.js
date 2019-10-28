const { SoftSkillsModel } = require('../database');
const { mapKeys, omit } = require('lodash');
const keyDictionary = require('../config/softSkillsDictionary.json');

const SoftSkillsController = async (ctx) => {
  const user = await SoftSkillsModel.query().findOne({ userId: ctx.user.id }) || {};

  ctx.body = mapKeys(omit(user, ['id', 'userId']), (val, key) => keyDictionary[key]);
};

const SoftSkillsRoute = '/softSkills';

module.exports = {
  SoftSkillsController,
  SoftSkillsRoute,
};
