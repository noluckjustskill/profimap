const { maxBy } = require('lodash');
const {
  knex,
  GollandTasksModel,
  GollandTypesModel,
  GollandResultsModel
} = require('../database');
const { keyWithMaxValue } = require('../utils/object');
const { answers } = require('../config/golland/golland.json');
const keyDictionary = require('../config/golland/gollandSkillsDictionary.json');

const staticUrl = process.env.STATIC_URL;

const getTasks = async() => {
  return GollandTasksModel
    .query()
    .withGraphJoined( '[left, right]', { joinOperation: 'innerJoin' })
    .modifyGraph('[left, right]', qb => {
      qb.select('name', 'smallDescr', knex.raw(`CONCAT('${staticUrl}/', image) as image`));
    })
    .select('left.image as left:image')
    .select('right.image as right:image')
    .execute();
};

const getProfileResult = async (userId) => {
  const results = await GollandResultsModel
    .query()
    .where({ userId })
    .withGraphJoined('gollandType', { joinOperation: 'innerJoin' })
    .execute();

  return results.reduce((acc, elem) => {
    acc[keyDictionary[elem.gollandType.name] || elem.gollandType.name] = {
      descr: elem.gollandType.descr,
      result: elem.result,
    };

    return acc;
  }, {});
};

const getProfileType = async (userId) => {
  const ids = await GollandResultsModel
    .query()
    .where({ userId })
    .max('result as max')
    .select('gollandTypeId')
    .groupBy('id');

  if (!ids || !ids.length) {
    return null;
  }

  const { gollandTypeId } = maxBy(ids, res => res.max);

  return GollandTypesModel.query().findById(gollandTypeId);
};

const insertResult = async (userId, result = []) => {
  // Delete old results
  await GollandResultsModel.query().delete().where({ userId });

  const profileTypes = {};

  await Promise.all(Object.keys(answers).map(typeName => {
    const typeResult = answers[typeName].reduce((acc, curr) => {
      if (Boolean(result[curr.num]) === Boolean(curr.answer)) {
        acc++;
      }

      return acc;
    }, 0) / answers[typeName].length;

    profileTypes[typeName] = typeResult;

    return GollandTypesModel
      .query()
      .findOne({ name: typeName })
      .then(({ id }) => GollandResultsModel
        .query()
        .insert({
          userId,
          gollandTypeId: id,
          result: typeResult,
        })
      );
  }));

  const profileType = keyWithMaxValue(profileTypes);
  const description = await GollandTypesModel.query().findOne({ name: profileType }).then(({ descr }) => descr);

  return {
    name: keyDictionary[profileType],
    description
  };
};

module.exports = {
  getTasks,
  insertResult,
  getProfileResult,
  getProfileType,
};
