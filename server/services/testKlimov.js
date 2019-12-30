const {
  KlimovTasksModel,
  KlimovTypesModel,
  KlimovResultsModel
} = require('../database');
const { keyWithMaxValue } = require('../utils/object');
const { answers } = require('../config/klimov/klimov.json');
const keyDictionary = require('../config/klimov/klimovSkillsDictionary.json');

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
  insertResult
};
