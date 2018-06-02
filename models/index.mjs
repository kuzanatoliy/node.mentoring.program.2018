import dataTypes from 'sequelize';
import queryInterface from './connection';

import defineProductModel from './product';
import defineUserModel from './user';
import defineReviewModel from './review';

const definitions = [
  defineProductModel,
  defineUserModel,
  defineReviewModel,
];

const models = {};

let fakeHash = 0;
definitions.forEach(
  (definition) => {
    const model = queryInterface.import(`fake/path/for/cache/${ fakeHash++ }`, definition);
    models[model.name] = model;
  }
);

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.queryInterface = queryInterface;
models.dataTypes = dataTypes;

export default models;
