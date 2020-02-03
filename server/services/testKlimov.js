const {
  KlimovTasksModel,
  KlimovTypesModel,
  KlimovResultsModel
} = require('../database');
const { keyWithMaxValue } = require('../utils/object');
const { answers } = require('../config/klimov/klimov.json');
const { max, min } = require('lodash');
const keyDictionary = require('../config/klimov/klimovSkillsDictionary.json');
const dataForRecommendations = require('../config/klimov/klimovRecommendations.json');

const staticUrl = process.env.STATIC_URL;

const getTasks = async () => {
  const tasks = await KlimovTasksModel
    .query()
    .select(
      'leftText', 'rightText'
    );

  return tasks.map(task => ([{
    name: task.leftText,
  }, {
    name: task.rightText,
  }]));
};

const getProfileResult = async (userId) => {
  const types = await KlimovTypesModel.query().select('*');
  const resultsList = await KlimovResultsModel
    .query()
    .where({ userId })
    .select('klimovTypeId', 'result');
  const results = resultsList.reduce((acc, curr) => {
    acc[curr.klimovTypeId] = curr.result;
    return acc;
  }, {});

  return types.map((type) => ({
    ...type,
    name: keyDictionary[type.name],
    image: `${staticUrl}/${type.image}`,
    result: results[type.id] || 0,
  }));
};

const getProfileRecommendations = async (userId) => {
  const types = await KlimovTypesModel.query().select('id', 'name');
  const resultsList = await KlimovResultsModel
    .query()
    .where({ userId })
    .select('klimovTypeId', 'result');
  const results = resultsList.reduce((acc, curr) => {
    acc[curr.klimovTypeId] = curr.result;
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
  const recommendations = dataForRecommendations['nature'];
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

const insertResult = async (userId, result = []) => {
  // Delete old results
  await KlimovResultsModel.query().delete().where({ userId });

  const profileTypes = {};

  await Promise.all(Object.keys(answers).map(typeName => {
    const typeResult = answers[typeName].reduce((acc, curr) => {
      if (result[curr.num] == curr.answer) { // `==` cuz 0 it's false, 1 is true
        acc++;
      }
      return acc;
    }, 0) / answers[typeName].length;
 
    profileTypes[typeName] = typeResult;
    
    return KlimovTypesModel.query().findOne({ name: typeName }).then(({ id }) => KlimovResultsModel
      .query()
      .insert({
        userId,
        klimovTypeId: id,
        result: typeResult,
      })
    );
  }));

  const profileType = keyWithMaxValue(profileTypes);
  const klimovType = await KlimovTypesModel.query().findOne({ name: profileType });

  return {
    ...klimovType,
    name: keyDictionary[profileType],
    image: `${staticUrl}/${klimovType.image}`,
  };
};

module.exports = {
  getTasks,
  getProfileResult,
  getProfileRecommendations,
  insertResult
};
