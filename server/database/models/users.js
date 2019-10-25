const { Model } = require('objection');
const AuthUsers = require('./authUsers');

module.exports = class Users extends Model {
  static get tableName() {
    return 'users';
  }
  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      auth_users: {
        relation: Model.HasManyRelation,
        modelClass: AuthUsers,
        join: {
          from: 'users.id',
          to: 'authUsers.userId'
        },
      },
    };
  }
};
