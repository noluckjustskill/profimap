const { Model } = require('objection');
const Users = require('./users');

module.exports = class KlimovResults extends Model {
  static get tableName() {
    return 'klimovResults';
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
          from: 'klimovResults.userId',
          to: 'users.id'
        },
      },
    };
  }
};
