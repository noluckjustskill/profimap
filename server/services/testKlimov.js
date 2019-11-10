const {
  KlimovTasksModel,
  KlimovTypesModel,
  KlimovResultsModel
} = require('../database');
const { keyWithMaxValue } = require('../utils/object');
const { answers } = require('../config/klimov/klimov.json');
const keyDictionary = require('../config/klimov/klimovSkillsDictionary.json');
const { maxBy } = require('lodash');

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
  const ids = await KlimovResultsModel
    .query()
    .where({ userId })
    .max('result as max')
    .select('klimovTypeId')
    .groupBy('id');

  if (!ids || !ids.length) {
    return null;
  }

  const { klimovTypeId } = maxBy(ids, res => res.max);
    
  const { name, image, ...descr } = await KlimovTypesModel
    .query()
    .findById(klimovTypeId);
  
  const staticUrl = process.env.STATIC_URL;

  return {
    ...descr,
    name: keyDictionary[name],
    image: `${staticUrl}/${image}`,
  };
};

const insertResult = async (userId, result = []) => {
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
  const staticUrl = process.env.STATIC_URL;

  return {
    ...klimovType,
    name: keyDictionary[profileType],
    image: `${staticUrl}/${klimovType.image}`,
  };
};

module.exports = {
  getTasks,
  getProfileResult,
  insertResult
};
