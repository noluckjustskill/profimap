const { Model } = require('objection');

module.exports = class DiskTasks extends Model {
  static get tableName() {
    return 'diskTasks';
  }
  static get idColumn() {
    return 'id';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'a', 'b', 'c', 'd'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        a: { type: 'string' },
        b: { type: 'string' },
        c: { type: 'string' },
        d: { type: 'string' },
      }
    };
  }
};
