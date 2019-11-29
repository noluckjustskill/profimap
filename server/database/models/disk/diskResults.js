const { Model } = require('objection');
const Users = require('../users');
const DiskTypes = require('./diskTypes');

module.exports = class DiskResults extends Model {
  static get tableName() {
    return 'diskResults';
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
          from: 'diskResults.userId',
          to: 'users.id'
        },
      },
      diskType: {
        relatiom: Model.BelongsToOneRelation,
        modelClass: DiskTypes,
        join: {
          from: 'diskResults.diskTypeId',
          to: 'diskTypes.id'
        }
      }
    };
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'diskTypeId', 'result'],
      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        diskTypeId: { type: 'integer' },
        result: { type: 'decimal' }
      }
    };
  }
};
