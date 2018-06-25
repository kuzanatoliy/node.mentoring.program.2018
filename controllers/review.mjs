import models from '../models';

const { Review, User } = models;

export const COMMON_ATTRIBUTES = ['id', 'userId', 'productId', 'value', 'createAt'];

export const USER_INCLUDE_CONFIG = {
  model: User,
  attributes: ['id', 'email', 'firstName', 'lastName'],
};

export async function getReviewListForProduct(productId) {
  return Review.findAll({ where: { productId }, include: [USER_INCLUDE_CONFIG] });
}
