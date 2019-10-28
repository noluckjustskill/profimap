const { Model } = require('objection');
const Users = require('./users');

module.exports = class SoftSkills extends Model {
  static get tableName() {
    return 'softSkills';
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
          from: 'softSkills.userId',
          to: 'users.id'
        },
      },
    };
  }
};
