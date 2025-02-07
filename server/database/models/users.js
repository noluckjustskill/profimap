const { Model } = require('objection');
const GollandResults = require('./golland/gollandResults');
const KlimovResults = require('./klimov/klimovResults');
const BelbinResults = require('./belbin/belbinResults');
const DiskResults = require('./disk/diskResults');
const FeedBack = require('./feedback');

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
      klimovResults: {
        relation: Model.HasManyRelation,
        modelClass: KlimovResults,
        join: {
          from: 'users.id',
          to: 'klimovResults.userId'
        }
      },
      belbinResults: {
        relation: Model.HasManyRelation,
        modelClass: BelbinResults,
        join: {
          from: 'users.id',
          to: 'belbinResults.userId'
        }
      },
      diskResults: {
        relation: Model.HasManyRelation,
        modelClass: DiskResults,
        join: {
          from: 'users.id',
          to: 'diskResults.userId'
        }
      },
      userFeedback: {
        relation: Model.HasManyRelation,
        modelClass: FeedBack,
        join: {
          from: 'users.id',
          to: 'feedback.userId'
        }
      },
    };
  }
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        gender: { type: ['string', 'null'] },
        dateOfBirth: { type: ['string', 'null'] },
        email: { type: ['string', 'null'] },
        externalId: { type: ['string', 'null'] },
        status: { type: 'string' },
        paid: { type: 'boolean' },
        password: { type: ['string', 'null'] },
        picture: { type: ['string', 'null'] },
        createdAt: { type: 'string' },
        lastLogin: { type: ['string', 'null'] },
      }
    };
  }
};
