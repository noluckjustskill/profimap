const { Model } = require('objection');
const Professions = require('../professions');
const GollandTypes = require('./gollandTypes');

module.exports = class GollandRecommendations extends Model {
  static get tableName() {
    return 'gollandRecommendations';
  }
  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      profession: {
        relation: Model.BelongsToOneRelation,
        modelClass: Professions,
        join: {
          from: 'gollandRecommendations.professionId',
          to: 'professions.id'
        },
      },
      gollandType: {
        relation: Model.BelongsToOneRelation,
        modelClass: GollandTypes,
        join: {
          from: 'gollandRecommendations.gollandTypeId',
          to: 'gollandTypes.id'
        }
      }
    };
  }
};
