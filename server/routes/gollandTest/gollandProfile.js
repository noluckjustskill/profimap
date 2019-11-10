const { getProfileType, getRecommendations } = require('../../services/testGolland');
const keyDictionary = require('../../config/golland/gollandSkillsDictionary.json');

const GollandProfileController = async (ctx) => {
  const profileType = await getProfileType(ctx.user.id);

  if (profileType) {
    const recommendations = await getRecommendations(profileType.name);
    ctx.body = {
      name: keyDictionary[profileType.name],
      description: profileType.descr,
      recommendations,
    };
  } else {
    ctx.body = null;
  }
};

const GollandProfileRoute = '/gollandProfile';

module.exports = {
  GollandProfileController,
  GollandProfileRoute,
};
