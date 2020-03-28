const { Model } = require('objection');
const Users = require('./users');

module.exports = class InvitedUsers extends Model {
  static get tableName() {
    return 'invitedUsers';
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
          from: 'invitedUsers.userId',
          to: 'users.id',
        }
      },
    };
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'code'],
      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        code: { type: 'string' },
      },
    };
  }
};
