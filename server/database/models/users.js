const { Model } = require('objection');
const AuthUsers = require('./authUsers');
const GollandResults = require('./gollandResults');
const KlimovResults = require('./klimovResults');

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
      gollandResults: {
        relation: Model.HasManyRelation,
        modelClass: GollandResults,
        join: {
          from: 'users.id',
          to: 'gollandResults.userId'
        }
      },
      KlimovResults: {
        relation: Model.HasManyRelation,
        modelClass: KlimovResults,
        join: {
          from: 'users.id',
          to: 'klimovResults.userId'
        }
      }
    };
  }
};
