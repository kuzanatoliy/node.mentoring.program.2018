import mongoose from 'mongoose';
import './connection';

import defineCityModel from './city';
import defineProductModel from './product';
import defineUserModel from './user';
import defineReviewModel from './review';

const Schema = mongoose.Schema;

const definitions = [
  defineCityModel,
  defineProductModel,
  defineUserModel,
  defineReviewModel,
];

definitions.forEach(definition => definition(mongoose, Schema));

export default mongoose.models;
