const { UniversitiesModel } = require('../database');
const staticUrl = process.env.STATIC_URL;

const getUniversities = async (city) => {
  const universitiesQuery = UniversitiesModel.query();

  if (city) {
    universitiesQuery.where({ city });
  }

  const universities = await universitiesQuery.select('*');
  return universities.map(elem => ({
    ...elem,
    image: `${staticUrl}/${elem.image}`,
  }));
};

const getCities = async () => {
  return UniversitiesModel
    .query()
    .distinct('city');
};

module.exports = {
  getUniversities,
  getCities,
};
