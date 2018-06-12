import models from '../models';

const { Review } = models;

export function getReviewListForProduct(productId) {
  return Review.findAll({ where: { productId } });
}
