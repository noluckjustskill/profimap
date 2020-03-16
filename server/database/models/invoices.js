const { Model } = require('objection');
const User = require('./users');

module.exports = class Invoices extends Model {
  static get tableName() {
    return 'invoices';
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
          from: 'invoices.userId',
          to: 'users.id'
        }
      },
    };
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'amount'],
      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        amount: { type: 'integer' },
        status: { type: 'string' },
        createdAt: { type: 'string' },
      }
    };
  }
};
