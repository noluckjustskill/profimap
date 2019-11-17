const { Model } = require('objection');

module.exports = class BelbinTypes extends Model {
  static get tableName() {
    return 'belbinTypes';
  }
  static get idColumn() {
    return 'id';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'descr', 'func'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        image: { type: 'string' },
        descr: { type: 'string' },
        func: { type: 'string' },
      }
    };
  }
};
