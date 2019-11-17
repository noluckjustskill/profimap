const { Model } = require('objection');

module.exports = class GollandTypes extends Model {
  static get tableName() {
    return 'gollandTypes';
  }
  static get idColumn() {
    return 'id';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'descr'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        descr: { type: 'string' }
      }
    };
  }
};
