const {
  DiskTasksModel,
  DiskTypesModel,
  DiskResultsModel
} = require('../database');
const { keyWithMaxValue } = require('../utils/object');
const { answers } = require('../config/disk/disk.json');
const { maxBy } = require('lodash');

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
  const ids = await DiskResultsModel
    .query()
    .where({ userId })
    .max('result as max')
    .select('diskTypeId')
    .groupBy('id');

  if (!ids || !ids.length) {
    return null;
  }

  const { diskTypeId } = maxBy(ids, res => res.max);
    
  const { image, ...descr } = await DiskTypesModel
    .query()
    .findById(diskTypeId);
  
  const staticUrl = process.env.STATIC_URL;

  return {
    ...descr,
    image: `${staticUrl}/${image}`,
  };
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
  const staticUrl = process.env.STATIC_URL;

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
