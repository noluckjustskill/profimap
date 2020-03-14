const { UniversitiesModel } = require('../database');
const staticUrl = process.env.STATIC_URL;

const getUniversities = async () => {
  const universities = UniversitiesModel
    .query()
    .select('*');
  return universities.map(elem => ({
    ...elem,
    image: `${staticUrl}/${elem.image}`,
  }));
};

module.exports = {
  getUniversities,
};
