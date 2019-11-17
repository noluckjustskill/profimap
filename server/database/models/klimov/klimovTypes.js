const { Model } = require('objection');

module.exports = class KlimovTypes extends Model {
  static get tableName() {
    return 'klimovTypes';
  }
  static get idColumn() {
    return 'id';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'shortText', 'fullText'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        shortText: { type: 'string' },
        fullText: { type: 'string' },
        image: { type: 'string' }
      }
    };
  }
};
