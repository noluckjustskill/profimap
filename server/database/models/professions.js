const { Model } = require('objection');

module.exports = class Professions extends Model {
  static get tableName() {
    return 'professions';
  }
  static get idColumn() {
    return 'id';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        image: { type: 'string' },
        smallDescr: { type: 'string' },
        fullDescr: { type: 'string' },
        dangerous: { type: 'string' },
        requirements: { type: 'string' },
        education: { type: 'string' },
      }
    };
  }
};
