const {
  DiskTasksModel,
  DiskTypesModel,
  DiskResultsModel
} = require('../database');
const { keyWithMaxValue } = require('../utils/object');
const { answers } = require('../config/disk/disk.json');

const staticUrl = process.env.STATIC_URL;

const getTasks = async () => {
  const list = await DiskTasksModel
    .query()
    .select('name', 'a', 'b', 'c', 'd');

  return list.map(({ name, ...data }) => ({
    name,
    tasks: Object.values(data).filter(Boolean),
  }));
};

const getProfileResult = async (userId) => {
  const types = await DiskTypesModel.query().select('*');
  const resultsList = await DiskResultsModel
    .query()
    .where({ userId })
    .select('diskTypeId', 'result');
  const results = resultsList.reduce((acc, curr) => {
    acc[curr.diskTypeId] = curr.result;
    return acc;
  }, {});

  return types.map((type) => ({
    ...type,
    image: `${staticUrl}/${type.image}`,
    result: results[type.id] || 0,
  }));
};

const insertResult = async (userId, result = []) => {
  // Delete old results
  await DiskResultsModel.query().delete().where({ userId });

  const profileTypes = {};

  await Promise.all(Object.keys(answers).map(typeName => {
    const typeResult = answers[typeName].reduce((acc, curr, i) => {
      if (result[i] === curr) {
        acc++;
      }
      return acc;
    }, 0) / answers[typeName].length;
 
    profileTypes[typeName] = typeResult;
    
    return DiskTypesModel.query().findOne({ name: typeName }).then(({ id }) => DiskResultsModel
      .query()
      .insert({
        userId,
        diskTypeId: id,
        result: typeResult,
      })
    );
  }));

  const profileType = keyWithMaxValue(profileTypes);
  const diskType = await DiskTypesModel.query().findOne({ name: profileType });

  return {
    ...diskType,
    image: `${staticUrl}/${diskType.image}`,
  };
};

module.exports = {
  getTasks,
  getProfileResult,
  insertResult
};
