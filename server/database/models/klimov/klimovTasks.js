const { Model } = require('objection');

module.exports = class KlimovTasks extends Model {
  static get tableName() {
    return 'klimovTasks';
  }
  static get idColumn() {
    return 'id';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['leftText', 'rightText'],
      properties: {
        id: { type: 'integer' },
        leftText: { type: 'string' },
        rightText: { type: 'string' }
      }
    };
  }
};
