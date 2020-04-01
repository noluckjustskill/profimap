const { Model } = require('objection');

module.exports = class Professions extends Model {
  static get tableName() {
    return 'professions';
  }
  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      directions: {
        relation: Model.ManyToManyRelation,
        modelClass: require('./directions'),
        join: {
          from: 'professions.id',
          through: {
            from: 'directionsToProfessions.professionId',
            to: 'directionsToProfessions.directionId',
          },
          to: 'directions.id',
        }
      }     
    };
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        image: { type: 'string' },
        smallDescr: { type: 'string' },
        fullDescr: { type: 'string' },
        dangerous: { type: 'string' },
        requirements: { type: 'string' },
        education: { type: 'string' },
      }
    };
  }
};
