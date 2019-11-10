const { Model } = require('objection');

module.exports = class KlimovTypes extends Model {
  static get tableName() {
    return 'klimovTypes';
  }
  static get idColumn() {
    return 'id';
  }
};
