const { Model } = require('objection');
const Users = require('../users');
const GollandTypes = require('./gollandTypes');

module.exports = class GollandResults extends Model {
  static get tableName() {
    return 'gollandResults';
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
          from: 'gollandResults.userId',
          to: 'users.id'
        },
      },
      gollandType: {
        relation: Model.BelongsToOneRelation,
        modelClass: GollandTypes,
        join: {
          from: 'gollandResults.gollandTypeId',
          to: 'gollandTypes.id'
        }
      }
    };
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'gollandTypeId', 'result'],
      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        gollandTypeId: { type: 'integer' },
        result: { type: 'decimal' }
      }
    };
  }
};
