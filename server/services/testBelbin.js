const {
  BelbinTasksModel,
  BelbinTypesModel,
  BelbinResultsModel
} = require('../database');
const { keyWithMaxValue } = require('../utils/object');
const { answers, sum } = require('../config/belbin/belbin.json');
const { max, min } = require('lodash');
const keyDictionary = require('../config/belbin/belbinSkillsDictionary.json');
const dataForRecommendations = require('../config/belbin/belbinRecommendations.json');

const staticUrl = process.env.STATIC_URL;

const getTasks = async () => {
  const tasks = await BelbinTasksModel
    .query()
    .select(
      'blockId', 'text'
    );

  const groupTasks = tasks.reduce((acc, curr) => {
    if (!acc[curr.blockId]) {
      acc[curr.blockId] = [];
    }

    acc[curr.blockId].push(curr.text);
    return acc;
  }, {});

  return Object.values(groupTasks);
};

const getProfileResult = async (userId) => {
  const types = await BelbinTypesModel.query().select('*');
  const resultsList = await BelbinResultsModel
    .query()
    .where({ userId })
    .select('belbinTypeId', 'result');
  const results = resultsList.reduce((acc, curr) => {
    acc[curr.belbinTypeId] = curr.result;
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
  const types = await BelbinTypesModel.query().select('id', 'name');
  const resultsList = await BelbinResultsModel
    .query()
    .where({ userId })
    .select('belbinTypeId', 'result');
  const results = resultsList.reduce((acc, curr) => {
    acc[curr.belbinTypeId] = curr.result;
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
  const recommendations = dataForRecommendations['implementer'];
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

const insertResult = async (userId, result = {}) => {
  // Delete old results
  await BelbinResultsModel.query().delete().where({ userId });

  const profileTypes = {};

  await Promise.all(Object.keys(answers).map(typeName => {
    const typeResult = answers[typeName].reduce((acc, curr) => {
      acc += result[curr] || 0;
      return acc;
    }, 0) / sum;
 
    profileTypes[typeName] = typeResult;
    
    return BelbinTypesModel.query().findOne({ name: typeName }).then(({ id }) => BelbinResultsModel
      .query()
      .insert({
        userId,
        belbinTypeId: id,
        result: typeResult,
      })
    );
  }));

  const profileType = keyWithMaxValue(profileTypes);
  const belbinType = await BelbinTypesModel.query().findOne({ name: profileType });

  return {
    ...belbinType,
    name: keyDictionary[profileType],
    image: `${staticUrl}/${belbinType.image}`,
  };
};

module.exports = {
  getTasks,
  getProfileResult,
  getProfileRecommendations,
  insertResult
};
