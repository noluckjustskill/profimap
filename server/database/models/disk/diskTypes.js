const { Model } = require('objection');

module.exports = class DiskTypes extends Model {
  static get tableName() {
    return 'diskTypes';
  }
  static get idColumn() {
    return 'id';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'text'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        text: { type: 'string' },
        image: { type: 'string' }
      }
    };
  }
};
