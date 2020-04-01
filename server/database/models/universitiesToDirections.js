const { Model } = require('objection');
const Directions = require('./directions');

module.exports = class UniversitiesToDirections extends Model {
  static get tableName() {
    return 'universitiesToDirections';
  }
  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      directions: {
        relation: Model.BelongsToOneRelation,
        modelClass: Directions,
        join: {
          from: 'universitiesToDirections.directionId',
          to: 'directions.id'
        },
      },
    };
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['directionId', 'universityId'],
      properties: {
        id: { type: 'integer' },
        directionId: { type: 'integer' },
        universityId: { type: 'integer' },
        score: { type: 'integer' },
      }
    };
  }
};
