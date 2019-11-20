const { getProfession } = require('../services/professions');
const { get } = require('lodash');
const { NotFoundError, BadRequestError } = require('http-custom-errors');
const staticUrl = process.env.STATIC_URL;

const ProfessionController = async (ctx) => {
  const param = get(ctx, 'request.query.id');
  if (!param) { 
    throw new BadRequestError('Not found id in query'); 
  }

  const res = await getProfession(param);
  if (!res) {
    throw new NotFoundError('Profession not found');
  }
  res.image = `${staticUrl}/${res.image}`;
  ctx.body = res;
};

const ProfessionRoute = '/getProfession';

module.exports = {
  ProfessionController,
  ProfessionRoute
};
