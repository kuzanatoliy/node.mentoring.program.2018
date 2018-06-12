import models from '../models';

const { Product } = models;

export function getProduct(id) {
  return Product.findOne({ where: { id } });
};

export function getProductList() {
  return Product.findAll();
}

export function createProduct(product) {
  const { name, description, shortDescription, price } = product;
  return Product.create({
    name,
    description,
    shortDescription,
    price,
  });
}
