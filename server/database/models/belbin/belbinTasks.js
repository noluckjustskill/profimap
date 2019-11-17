const { Model } = require('objection');

module.exports = class BelbinTasks extends Model {
  static get tableName() {
    return 'belbinTasks';
  }
  static get idColumn() {
    return 'id';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['blockId', 'text'],
      properties: {
        id: { type: 'integer' },
        blockId: { type: 'integer' },
        text: { type: 'string' }
      }
    };
  }
};
