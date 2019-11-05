const { KlimovResultsModel } = require('../../database');
const { omit } = require('lodash');
const { keyWithMaxValue } = require('../../utils/object');
const keyDictionary = require('../../config/klimov/klimovSkillsDictionary.json');
const klimovDescr = require('../../config/klimov/klimovDescr.json');

const KlimovResultsController = async (ctx) => {
  const user = await KlimovResultsModel.query().findOne({ userId: ctx.user.id }) || {};
  const type = keyWithMaxValue(omit(user, ['id', 'userId']));

  ctx.body = {
    name: keyDictionary[type],
    description: klimovDescr[type],
  };
};

const KlimovResultsRoute = '/klimovResults';

module.exports = {
  KlimovResultsController,
  KlimovResultsRoute,
};
