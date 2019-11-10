const { Model } = require('objection');
const Users = require('../users');
const KlimovTypes = require('./klimovTypes');

module.exports = class KlimovResults extends Model {
  static get tableName() {
    return 'klimovResults';
  }
  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'klimovResults.userId',
          to: 'users.id'
        },
      },
      klimovType: {
        relatiom: Model.BelongsToOneRelation,
        modelClass: KlimovTypes,
        join: {
          from: 'klimovResults.klimovTypeId',
          to: 'klimovTypes.id'
        }
      }
    };
  }
};
