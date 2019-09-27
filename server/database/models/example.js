const { Model } = require('objection');

module.exports = class Example extends Model {
  static get tableName() {
    return 'messages';
  }
  static get idColumn() {
    return 'id';
  }
};
