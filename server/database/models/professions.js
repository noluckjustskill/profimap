const { Model } = require('objection');

module.exports = class Professions extends Model {
  static get tableName() {
    return 'professions';
  }
  static get idColumn() {
    return 'id';
  }
};
