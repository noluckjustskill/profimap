const { ProfessionsModel } = require('../database');

const getProfession = async (profId) => {
  return ProfessionsModel
    .query()
    .findById(profId);
};

module.exports = {
  getProfession,
};
