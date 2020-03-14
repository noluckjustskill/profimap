const { getUniversities } = require('../services/universities');
const { NotFoundError } = require('http-custom-errors');

const UniversitiesController = async (ctx) => {
  const res = await getUniversities();
  if (!res) {
    throw new NotFoundError('Profession not found');
  }
  ctx.body = res;
};

const UniversitiesRoute = '/getUniversities';

module.exports = {
  UniversitiesController,
  UniversitiesRoute,
};
