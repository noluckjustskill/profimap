const { Model } = require('objection');
const Users = require('./users');

module.exports = class AuthUsers extends Model {
  static get tableName() {
    return 'authUsers';
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
          from: 'authUsers.userId',
          to: 'users.id'
        },
      },
    };
  }
};
