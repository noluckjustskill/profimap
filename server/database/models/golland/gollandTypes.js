const { Model } = require('objection');

module.exports = class GollandTypes extends Model {
  static get tableName() {
    return 'gollandTypes';
  }
  static get idColumn() {
    return 'id';
  }
};
