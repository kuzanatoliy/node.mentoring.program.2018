import models from '../../models';

const { Product } = models;

export const COMMON_ATTRIBUTES = ['id', 'name', 'shortDescription', 'description', 'price'];
export const SHORT_COMMON_ATTRIBUTES = ['id', 'name', 'shortDescription'];

export async function findProductById(id) {
  return Product.findById(id);
}

export async function getProduct(id) {
  return Product.findOne({ where: { id }, attributes: COMMON_ATTRIBUTES });
};

export async function createProduct(product) {
  const { name, description, shortDescription, price } = product;
  return Product.create({ name, description, shortDescription, price });
}

export async function updateProduct(product, params) {
  const { name, description, shortDescription, price } = params;
  return product.update({ name, description, shortDescription, price });
}

export async function removeProduct(id) {
  return Product.destroy({ where: {id} });
}

export async function getProductList() {
  return Product.findAll({ attributes: SHORT_COMMON_ATTRIBUTES });
}
