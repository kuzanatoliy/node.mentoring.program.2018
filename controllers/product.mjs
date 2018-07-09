import models from '../models';

const { Product } = models;

export const COMMON_ATTRIBUTES = ['id', 'name', 'shortDescription', 'description', 'price'];
export const SHORT_COMMON_ATTRIBUTES = ['id', 'name', 'shortDescription'];

export async function findProductById(id) {
  return Product.findById(id).exec();
}

export async function getProduct(id) {
  return Product.findOne({ _id: id }, COMMON_ATTRIBUTES).exec();
};

export async function createProduct(product) {
  const { name, description, shortDescription, price, updateAt } = product;
  return Product.create({ name, description, shortDescription, price, updateAt });
}

export async function updateProduct(id, params) {
  const { name, description, shortDescription, price, updateAt } = params;
  return Product.findOneAndUpdate(
    { _id: id },
    { $set: { name, description, shortDescription, price, updateAt } },
    { new: true, fields: COMMON_ATTRIBUTES },
  ).exec();
}

export async function removeProduct(id) {
  return Product.remove({ _id: id }).exec();
}

export async function getProductList() {
  return Product.find({}, SHORT_COMMON_ATTRIBUTES).exec();
}
