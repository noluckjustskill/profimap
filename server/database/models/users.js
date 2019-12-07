const { Model } = require('objection');
const GollandResults = require('./golland/gollandResults');
const KlimovResults = require('./klimov/klimovResults');

module.exports = class Users extends Model {
  static get tableName() {
    return 'users';
  }
  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      gollandResults: {
        relation: Model.HasManyRelation,
        modelClass: GollandResults,
        join: {
          from: 'users.id',
          to: 'gollandResults.userId'
        }
      },
      KlimovResults: {
        relation: Model.HasManyRelation,
        modelClass: KlimovResults,
        join: {
          from: 'users.id',
          to: 'klimovResults.userId'
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
        email: { type: ['string', 'null'] },
        externalId: { type: 'string' },
        password: { type: 'string' },
        picture: { type: ['string', 'null'] },
      }
    };
  }
};
