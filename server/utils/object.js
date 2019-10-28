const { sortBy, last } = require('lodash');

const keyWithMaxValue = (obj = {}) => {
  return last(sortBy(Object.keys(obj), key => obj[key]));
};

module.exports = {
  keyWithMaxValue,
};
