const { Model } = require('objection');

module.exports = class KlimovTasks extends Model {
  static get tableName() {
    return 'klimovTasks';
  }
  static get idColumn() {
    return 'id';
  }
};
