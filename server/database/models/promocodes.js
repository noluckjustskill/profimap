const { Model } = require('objection');

module.exports = class Promocodes extends Model {
  static get tableName() {
    return 'promocodes';
  }
  static get idColumn() {
    return 'id';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['code', 'discount'],
      properties: {
        id: { type: 'integer' },
        code: { type: 'string' },
        discount: { type: 'float' },
      }
    };
  }
};
