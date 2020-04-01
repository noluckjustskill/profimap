const { Model } = require('objection');
const Professions = require('./professions');

module.exports = class Directions extends Model {
  static get tableName() {
    return 'directions';
  }
  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      professions: {
        relation: Model.ManyToManyRelation,
        modelClass: Professions,
        join: {
          from: 'directions.id',
          through: {
            from: 'directionsToProfessions.directionId',
            to: 'directionsToProfessions.professionId'
          },
          to: 'professions.id'
        }
      }, 
    };
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'code'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        code: { type: 'string' },
      }
    };
  }
};
