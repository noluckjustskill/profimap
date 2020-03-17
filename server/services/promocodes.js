const { NotFoundError } = require('http-custom-errors');
const { PromocodesModel, UsersModel, knex } = require('../database');

const ActivatePromocode = async (userId, code) => {
  const promo = await PromocodesModel.query().findOne({ userId: null, activated: null, code });
  if (!promo) {
    throw new NotFoundError('Промокод не найден');
  }

  await promo.$query().patch({ userId, activated: knex.raw('now()') });
  
  return UsersModel.query().findById(userId).patch({ paid: 1 });
};

module.exports = {
  ActivatePromocode,
};
