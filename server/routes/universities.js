const { getUniversities, getCities } = require('../services/universities');
const { get } = require('lodash');

const UniversitiesController = async (ctx) => {
  const city = get(ctx, 'request.query.city');
  ctx.body = await getUniversities(city);
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
