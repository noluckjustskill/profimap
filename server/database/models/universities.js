const { Model } = require('objection');

module.exports = class Unversities extends Model {
  static get tableName() {
    return 'universities';
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
        city: { type: 'string' },
        description: { type: ['string', 'null'] },
        image: { type: ['string', 'null'] },
      }
    };
  }
};
