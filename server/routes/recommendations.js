const { SoftSkillsModel } = require('../database');
const { keyWithMaxValue } = require('../utils/object');
const { omit } = require('lodash');
const recommendations = require('../config/gollandRecommendations.json');

const RecommendationsController = async (ctx) => {
  const user = await SoftSkillsModel.query().findOne({ userId: ctx.user.id }) || {};
  const userType = keyWithMaxValue(omit(user, ['id', 'userId']));
  const recommendation = userType ? recommendations[userType] : [];
  ctx.body = recommendation;
};

const RecommendationsRoute = '/recommendations';

module.exports = {
  RecommendationsController,
  RecommendationsRoute
};
