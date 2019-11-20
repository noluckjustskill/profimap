const { Model } = require('objection');
const Users = require('../users');
const BelbinTypes = require('./belbinTypes');

module.exports = class BelbinResults extends Model {
  static get tableName() {
    return 'belbinResults';
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
          from: 'belbinResults.userId',
          to: 'users.id'
        },
      },
      belbinType: {
        relatiom: Model.BelongsToOneRelation,
        modelClass: BelbinTypes,
        join: {
          from: 'belbinResults.belbinTypeId',
          to: 'belbinTypes.id'
        }
      }
    };
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'belbinTypeId', 'result'],
      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        belbinTypeId: { type: 'integer' },
        result: { type: 'decimal' }
      }
    };
  }
};
