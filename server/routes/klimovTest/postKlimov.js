const { get } = require('lodash');
const { keyWithMaxValue } = require('../../utils/object');
const { KlimovResultsModel } = require('../../database');

const { answers } = require('../../config/klimov/klimov.json');
const keyDictionary = require('../../config/klimov/klimovSkillsDictionary.json');
const klimovRecommendations = require('../../config/klimov/klimovRecommendations.json');
const golladDescription = require('../../config/klimov/klimovDescr.json');

const PostKlimovController = async (ctx) => {
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

  const klimovResultsUser = await KlimovResultsModel.query().findOne({ userId: ctx.user.id });

  if (klimovResultsUser) {
    await klimovResultsUser.$query().patch(profileTypes);
  } else {
    await KlimovResultsModel.query().insert({
      userId: ctx.user.id,
      ...profileTypes,
    });
  }
  
  ctx.body = {
    name: profileTypeName,
    description: golladDescription[profileType],
    recommendations: klimovRecommendations[profileType],
  };
};

const PostKlimovRoute = '/postKlimov';

module.exports = {
  PostKlimovController,
  PostKlimovRoute,
};
