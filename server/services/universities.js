const { UniversitiesModel } = require('../database');
const staticUrl = process.env.STATIC_URL;

const getUniversities = async ({ city, professionId }) => {
  const universitiesQuery = UniversitiesModel
    .query()
    .withGraphJoined(
      'universitiesToDirections.directions.professions',
      { minimize: true, joinOperation: 'innerJoin' },
    );

  if (city) {
    universitiesQuery.where('universities.city', city);
  }

  if (professionId) {
    universitiesQuery.modifyGraph('universitiesToDirections.directions.professions', qb => {
      qb.where({ id: professionId });
    });
  }

  const universities = await universitiesQuery.execute();
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
