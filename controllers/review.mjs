import models from '../models';

const { Review } = models;

export const COMMON_ATTRIBUTES = ['_id', 'value'];

export const USER_INCLUDE_CONFIG = {
  path: 'user',
  select: ['_id', 'email', 'firstName', 'lastName'],
};

export async function getReviewListForProduct(product) {
  return Review.find({ product }, COMMON_ATTRIBUTES)
    .populate(USER_INCLUDE_CONFIG).exec();
}
