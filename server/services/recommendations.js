const dataForGolland = require('../config/golland/gollandRecommendations.json');
const dataForKlimov = require('../config/klimov/klimovRecommendations.json');
const dataForBelbin = require('../config/belbin/belbinRecommendations.json');
const keyDictionary = require('../config/professionsDictionary.json');
const { max, min, cloneDeep } = require('lodash');
const {
  GollandResultsModel,
  KlimovResultsModel,
  BelbinResultsModel,
  ProfessionsModel,
} = require('../database');

const staticUrl = process.env.STATIC_URL;

//нормирование входных данных
const normirData = data => {
  Object.values(data).forEach(type => {
    const profList = Object.values(type);
    const maxValue = max(profList);    
    const minValue = min(profList);
    Object.keys(type).forEach(key => {
      let value = 0;
      if (maxValue - minValue !== 0) {
        value = (type[key] - minValue) / (maxValue - minValue);
      }
      type[key] = value;
    });
  });
  return data;
}; 

const recommendationsCalc = (types, results, testData) => {
  const recommendationsData = cloneDeep(testData);

  // нормирование массива с результатами
  const minResult = min(Object.values(results));
  const maxResult = max(Object.values(results));
  const normir = Object.values(results).map(result => {
    return (result - minResult) / (maxResult - minResult);
  });

  // нормированные данные в объект с результатами
  for (const key in results) {
    results[key] = normir[key-1];
  }

  const normResults = types.map(type => ({
    ...type,
    result: results[type.id] || 0,
  }));

  // перемножение критериев с нормированными результатами
  Object.keys(recommendationsData).forEach(type => {
    const perem = normResults[0] ? normResults.find(result => result.name === type).result : 0;
    for (const key in recommendationsData[type]) {
      recommendationsData[type][key] *= perem;  
    }
  });

  // суммирование топ-3 по каждой профессии
  const recommendations = Object.values(recommendationsData).shift();
  for (const key in recommendations) {
    const arr = [];
    for (const rcmd in recommendationsData) {
      arr.push(recommendationsData[rcmd][key]);
    }
    
    recommendations[key] = arr.reduce((a, b) => a + b, 0);
  }
  
  return recommendations;
};

const getRecommendations = async (userId) => {
  //получение данных с результатами для каждого теста
  //голланд
  const gollandResultsList = await GollandResultsModel
    .query()
    .where({ userId })
    .withGraphJoined('gollandType', { joinOperation: 'leftJoin' })
    .execute();

  const gollandTypes = gollandResultsList.map(elem => elem.gollandType);
  const gollandResults = gollandResultsList.reduce((acc, curr) => {
    acc[curr.gollandTypeId] = curr.result;
    return acc;
  }, {});

  //климов
  const klimovResultsList = await KlimovResultsModel
    .query()
    .where({ userId })
    .withGraphJoined('klimovType', { joinOperation: 'leftJoin' })
    .execute();
  
  const klimovTypes = klimovResultsList.map(elem => elem.klimovType);
  const klimovResults = klimovResultsList.reduce((acc, curr) => {
    acc[curr.klimovTypeId] = curr.result;
    return acc;
  }, {});

  //белбин
  const belbinResultsList = await BelbinResultsModel
    .query()
    .where({ userId })
    .withGraphJoined('belbinType', { joinOperation: 'leftJoin' })
    .execute();

  const belbinTypes = belbinResultsList.map(elem => elem.belbinType);
  const belbinResults = belbinResultsList.reduce((acc, curr) => {
    acc[curr.belbinTypeId] = curr.result;
    return acc;
  }, {});

  //расчет рекомендаций для каждого теста
  const gollandCalcResults = recommendationsCalc(gollandTypes, gollandResults, normirData(dataForGolland));
  const klimovCalcResults = recommendationsCalc(klimovTypes, klimovResults, normirData(dataForKlimov));
  const belbinCalcResults = recommendationsCalc(belbinTypes, belbinResults, normirData(dataForBelbin));

  //суммирование результатов
  const result = gollandCalcResults;
  for (const key in result) {
    result[key] += klimovCalcResults[key];
    result[key] += belbinCalcResults[key];
  };

  //возврат профессий с рекомендациями
  const professionsNames = Object.keys(result).sort((a, b) => result[b] - result[a]);
  const resultArr = professionsNames.map(elem => ({
    name: elem,
    result: result[elem],
  }));

  if (!resultArr.some(elem => elem.result)) {
    return [];
  }

  const professions = await ProfessionsModel
    .query()
    .withGraphJoined('directions', { joinOperation: 'innerJoin' })
    .whereIn('professions.name', professionsNames)
    .execute();

  return resultArr.reduce((acc, elem) => {
    const profession = professions.find(p => p.name === elem.name);
    if (profession) {
      profession.name = keyDictionary[elem.name] || elem.name;
      profession.result = elem.result;
      profession.image = `${staticUrl}/${profession.image}`;

      acc.push(profession);
    }

    return acc;
  }, []);
};

module.exports = {
  getRecommendations,
};
