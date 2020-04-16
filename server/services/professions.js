const { ProfessionsModel } = require('../database');
const professionsDictionary = require('../config/professionsDictionary.json');

const getProfession = async (profId) => {
  const profession = await ProfessionsModel
    .query()
    .findById(profId)
    .withGraphJoined('directions')
    .execute();

  if (profession) {
    profession.name = professionsDictionary[profession.name] || profession.name;
  }

  return profession;
};

module.exports = {
  getProfession,
};
