const {
  BelbinTasksModel,
  BelbinTypesModel,
  BelbinResultsModel
} = require('../database');
const { keyWithMaxValue } = require('../utils/object');
const { answers, sum } = require('../config/belbin/belbin.json');
const keyDictionary = require('../config/belbin/belbinSkillsDictionary.json');
const { maxBy } = require('lodash');

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
  const ids = await BelbinResultsModel
    .query()
    .where({ userId })
    .max('result as max')
    .select('belbinTypeId')
    .groupBy('id');

  if (!ids || !ids.length) {
    return null;
  }

  const { belbinTypeId } = maxBy(ids, res => res.max);
    
  const { name, image, ...descr } = await BelbinTypesModel
    .query()
    .findById(belbinTypeId);

  return {
    ...descr,
    name: keyDictionary[name],
    image: `${staticUrl}/${image}`,
  };
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
  insertResult
};
