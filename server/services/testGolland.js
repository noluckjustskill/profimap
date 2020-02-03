const { mapKeys, keyBy, maxBy } = require('lodash');
const {
  GollandTasksModel,
  GollandTypesModel,
  GollandResultsModel,
  GollandRecommendationsModel,
} = require('../database');
const { keyWithMaxValue } = require('../utils/object');
const { answers } = require('../config/golland/golland.json');
const { max, min } = require('lodash');
const keyDictionary = require('../config/golland/gollandSkillsDictionary.json');
const dataForRecommendations = require('../config/golland/gollandRecommendations.json');

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

const getProfileRecommendations = async (userId) => {
  const types = await GollandTypesModel.query().select('id', 'name');
  const resultsList = await GollandResultsModel
    .query()
    .where({ userId })
    .select('gollandTypeId', 'result');
  const results = resultsList.reduce((acc, curr) => {
    acc[curr.gollandTypeId] = curr.result;
    return acc;
  }, {});
  // нормирование массива с результатами
  const minResult = min(Object.values(results));
  const maxResult = max(Object.values(results));
  const normir = Object.values(results).map(result => {
    return (result - minResult) / (maxResult - minResult);
  });
  // нормированные данные в объект с результатами
  for (key in results) {
    results[key] = normir[key-1];
  }
  const normResults = types.map(type => ({
    ...type,
    result: results[type.id] || 0,
  }));
  // перемножение критериев с нормированными результатами
  Object.keys(dataForRecommendations).forEach(type => {
    const perem = normResults.find(result => result.name == type).result;
    for (key in dataForRecommendations[type]) {
      dataForRecommendations[type][key] *= perem;  
    }
  });
  // суммирование топ-3 по каждой профессии
  const recommendations = dataForRecommendations['realisticType'];
  for (key in recommendations) {
    const arr = [];
    for (key1 in dataForRecommendations) {
      arr.push(dataForRecommendations[key1][key]);
    }
    arr.sort((a, b) => b - a);
    recommendations[key] = arr[0] + arr[1] + arr[2];
  }
  
  return recommendations;
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

const getRecommendations = async (typeName) => {
  const result = await GollandRecommendationsModel
    .query()
    .leftJoinRelation('gollandType')
    .leftJoinRelation('profession')
    .where('gollandType.name', typeName)
    .select('profession.id', 'profession.name', 'profession.image', 'profession.smallDescr');

  const staticUrl = process.env.STATIC_URL;

  return result.map(rcmd => ({
    ...rcmd,
    image: `${staticUrl}/${rcmd.image}`,
  }));
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
  getProfileRecommendations,
  getProfileType,
  getRecommendations,
};
