const { mapKeys, keyBy, maxBy } = require('lodash');
const {
  GollandTasksModel,
  GollandTypesModel,
  GollandResultsModel
} = require('../database');
const { keyWithMaxValue } = require('../utils/object');
const { answers } = require('../config/golland/golland.json');
const keyDictionary = require('../config/golland/gollandSkillsDictionary.json');

const getTasks = async() => {
  const tasks = await GollandTasksModel
    .query()
    .leftJoinRelation('left')
    .leftJoinRelation('right')
    .select(
      'left.name as leftName', 'left.smallDescr as leftDescr', 'left.image as leftImage',
      'right.name as rightName', 'right.smallDescr as rightDescr', 'right.image as rightImage',
    );

  const staticUrl = process.env.STATIC_URL;

  return tasks.map(task => ([{
    name: task.leftName,
    descr: task.leftDescr,
    image: `${staticUrl}/${task.leftImage}`,
  }, {
    name: task.rightName,
    descr: task.rightDescr,
    image: `${staticUrl}/${task.rightImage}`,
  }]));
};

const getProfileResult = async (userId) => {
  const arr = await GollandResultsModel
    .query()
    .leftJoinRelation('gollandType')
    .where('gollandResults.userId', userId)
    .select('gollandType.name', 'gollandType.descr', 'gollandResults.result');
  if (!Object.values(arr).length) {
    const array = await GollandTypesModel.query().select('name');
    return array.map(el => keyDictionary[el.name]);
  }

  return mapKeys(keyBy(arr, 'name'), (val, key) => keyDictionary[key]);
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
      if (result[curr.num] == curr.answer) { // `==` cuz 0 it's false, 1 is true
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
    description,
    recommendations: await getRecommendations(profileType),
  };
};

module.exports = {
  getTasks,
  insertResult,
  getProfileResult,
  getProfileType,
};
