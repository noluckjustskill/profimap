const { Model } = require('objection');
const Professions = require('../professions');

module.exports = class GollandTasks extends Model {
  static get tableName() {
    return 'gollandTasks';
  }
  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      left: {
        relation: Model.BelongsToOneRelation,
        modelClass: Professions,
        join: {
          from: 'gollandTasks.leftId',
          to: 'professions.id'
        },
      },
      right: {
        relation: Model.BelongsToOneRelation,
        modelClass: Professions,
        join: {
          from: 'gollandTasks.rightId',
          to: 'professions.id'
        }
      }
    };
  }
};
