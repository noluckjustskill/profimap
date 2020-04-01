const { Model } = require('objection');
const UniversitiesToDirections = require('./universitiesToDirections');

module.exports = class Unversities extends Model {
  static get tableName() {
    return 'universities';
  }
  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      universitiesToDirections: {
        relation: Model.HasManyRelation,
        modelClass: UniversitiesToDirections,
        join: {
          from: 'universities.id',
          to: 'universitiesToDirections.universityId'
        }
      }
    };
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'link'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        city: { type: 'string' },
        description: { type: ['string', 'null'] },
        image: { type: ['string', 'null'] },
        link: { type: 'string'},
      }
    };
  }
};
