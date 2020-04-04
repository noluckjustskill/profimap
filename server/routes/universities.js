const { getUniversities, getCities } = require('../services/universities');
const { get } = require('lodash');

const UniversitiesController = async (ctx) => {
  const city = get(ctx, 'request.query.city');
  const professionId = get(ctx, 'request.query.professionId');
  ctx.body = await getUniversities({ city, professionId });
};

const UniversitiesRoute = '/getUniversities';

const CitiesController = async (ctx) => {
  ctx.body = await getCities();
};

const CitiesRoute = '/getCities';

module.exports = {
  UniversitiesController,
  UniversitiesRoute,
  CitiesController,
  CitiesRoute,
};
