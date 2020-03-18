const { Model } = require('objection');
const User = require('./users');
const Promocode = require('./promocodes');

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
      promocodes: {
        relation: Model.HasOneRelation,
        modelClass: Promocode,
        join: {
          from: 'invoices.promocodeId',
          to: 'promocodes.id'
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
        promocodeId: { type: ['integer', 'null'] },
        amount: { type: 'float' },
        status: { type: 'string' },
        createdAt: { type: 'string' },
      }
    };
  }
};
