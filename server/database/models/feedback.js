const { Model } = require('objection');
const Users = require('./users');

module.exports = class Feedback extends Model {
  static get tableName() {
    return 'feedback';
  }
  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      users: {
        relation: Model.HasOneRelation,
        modelClass: Users,
        join: {
          from: 'feedback.userId',
          to: 'users.id',
        }
      },
    };
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'rate'],
      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        path: { type: 'string' },
        rate: { type: 'integer' },
        message: { type: ['string', 'null'] },
      },
    };
  }
};
