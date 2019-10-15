const { Model } = require('objection');
const Users = require('./users');

module.exports = class AuthUsers extends Model {
  static get tableName() {
    return 'auth_users';
  }
  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'auth_users.user_id',
          to: 'users.id'
        },
      },
    };
  }
};
