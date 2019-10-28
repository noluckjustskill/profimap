const { get } = require('lodash');
const { keyWithMaxValue } = require('../../utils/object');
const { SoftSkillsModel } = require('../../database');

const { answers } = require('../../config/golland.json');
const keyDictionary = require('../../config/softSkillsDictionary.json');
const gollandRecommendations = require('../../config/gollandRecommendations.json');
const golladDescription = require('../../config/golladDescr.json');

const PostGollandController = async (ctx) => {
  const result = get(ctx, 'request.body.result', []);
  const profileTypes = {};

  Object.keys(answers).forEach(typeName => {
    profileTypes[typeName] = answers[typeName].reduce((acc, curr) => {
      if (result[curr.num] == curr.answer) { // `==` cuz 0 it's false, 1 is true
        acc++;
      }

      return acc;
    }, 0) / answers[typeName].length;
  });

  const profileType = keyWithMaxValue(profileTypes);
  const profileTypeName = keyDictionary[profileType];

  const softSKillUser = await SoftSkillsModel.query().findOne({ userId: ctx.user.id });

  if (softSKillUser) {
    await softSKillUser.$query().patch(profileTypes);
  } else {
    await SoftSkillsModel.query().insert({
      userId: ctx.user.id,
      ...profileTypes,
    });
  }
  
  ctx.body = {
    name: profileTypeName,
    description: golladDescription[profileType],
    recommendations: gollandRecommendations[profileType],
  };
};

const PostGollandRoute = '/postGolland';

module.exports = {
  PostGollandController,
  PostGollandRoute,
};
