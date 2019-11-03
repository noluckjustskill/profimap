const { sortBy, last, keys, values, isFinite } = require('lodash');

const keyWithMaxValue = (obj = {}) => {
  if (values(obj).every(elem => isFinite(elem))) {
    return last(sortBy(keys(obj), key => obj[key]));
  } 
  return undefined;
};

module.exports = {
  keyWithMaxValue,
};
