const { Model } = require('objection');
const Users = require('./users');

module.exports = class GollandResults extends Model {
  static get tableName() {
    return 'gollandResults';
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
          from: 'gollandResults.userId',
          to: 'users.id'
        },
      },
    };
  }
};
