const { getUniversities, getCities } = require('../services/universities');
const { NotFoundError } = require('http-custom-errors');
const { get } = require('lodash');

const UniversitiesController = async (ctx) => {
  const city = get(ctx, 'request.query.city');
  const res = await getUniversities(city);
  if (!res) {
    throw new NotFoundError('Universions not found');
  }
  ctx.body = res;
};

const UniversitiesRoute = '/getUniversities';

const CitiesController = async (ctx) => {
  const res = await getCities();
  if (!res) {
    throw new NotFoundError('Cities not found');
  }
  ctx.body = res;
};

const CitiesRoute = '/getCities';

module.exports = {
  UniversitiesController,
  UniversitiesRoute,
  CitiesController,
  CitiesRoute,
};
