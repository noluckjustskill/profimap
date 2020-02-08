const dataForGolland = require('../config/golland/gollandRecommendations.json');
const dataForKlimov = require('../config/klimov/klimovRecommendations.json');
const dataForBelbin = require('../config/belbin/belbinRecommendations.json');
const { max, min, chain } = require('lodash');
const {
  GollandTypesModel,
  GollandResultsModel,
  KlimovTypesModel,
  KlimovResultsModel,
  BelbinTypesModel,
  BelbinResultsModel,
} = require('../database');

const getRecommendations = async (userId) => {
  //getting data with results from database for every test
  //golland 
  const gollandTypes = await GollandTypesModel.query().select('id', 'name');
  const gollandResultsList = await GollandResultsModel
    .query()
    .where({ userId })
    .select('gollandTypeId', 'result');
  const gollandResults = gollandResultsList.reduce((acc, curr) => {
    acc[curr.gollandTypeId] = curr.result;
    return acc;
  }, {});

  //klimov
  const klimovTypes = await KlimovTypesModel.query().select('id', 'name');
  const klimovResultsList = await KlimovResultsModel
    .query()
    .where({ userId })
    .select('klimovTypeId', 'result');
  const klimovResults = klimovResultsList.reduce((acc, curr) => {
    acc[curr.klimovTypeId] = curr.result;
    return acc;
  }, {});

  //belbin
  const belbinTypes = await BelbinTypesModel.query().select('id', 'name');
  const belbinResultsList = await BelbinResultsModel
    .query()
    .where({ userId })
    .select('belbinTypeId', 'result');
  const belbinResults = belbinResultsList.reduce((acc, curr) => {
    acc[curr.belbinTypeId] = curr.result;
    return acc;
  }, {});

  //calculate recommendations for every test
  const gollandCalcResults = recommendationsCalc(gollandTypes, gollandResults, dataForGolland);
  const klimovCalcResults = recommendationsCalc(klimovTypes, klimovResults, dataForKlimov);
  const belbinCalcResults = recommendationsCalc(belbinTypes, belbinResults, dataForBelbin);

  //summary results
  const result = gollandCalcResults;
  for (key in result) {
    result[key] += klimovCalcResults[key];
    result[key] += belbinCalcResults[key];
  };

  //return top3 professions
  const resultArr = [];
  Object.keys(result).forEach(elem => {
    resultArr.push({name: elem, result: result[elem]});
  });
  
  return chain(resultArr).orderBy('result', 'desc').slice(0, 3);
};

const recommendationsCalc = (types, results, recommendationsData) => {
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
  Object.keys(recommendationsData).forEach(type => {
    const perem = normResults.find(result => result.name == type).result;
    for (key in recommendationsData[type]) {
      recommendationsData[type][key] *= perem;  
    }
  });

  // суммирование топ-3 по каждой профессии
  const recommendations = Object.values(recommendationsData).shift();
  for (key in recommendations) {
    const arr = [];
    for (key1 in recommendationsData) {
      arr.push(recommendationsData[key1][key]);
    }
    arr.sort((a, b) => b - a);
    recommendations[key] = arr[0] + arr[1] + arr[2];
  }
  
  return recommendations;
};

module.exports = {
  getRecommendations,
};
