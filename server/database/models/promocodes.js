const { Model } = require('objection');
const User = require('./users');

module.exports = class Promocodes extends Model {
  static get tableName() {
    return 'promocodes';
  }
  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      users: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'promocodes.userId',
          to: 'users.id'
        }
      },
    };
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['code'],
      properties: {
        id: { type: 'integer' },
        code: { type: 'string' },
        userId: { type: ['integer', 'null'] },
        activated: { type: ['string', 'null'] },
      }
    };
  }
};
