import { sendJsonData, sendJsonError } from '../../utils/response';
import { authMiddleware as isAuth } from '../../middlewares';

import {
  getProduct, getProductList, createProduct, updateProduct, removeProduct,
} from '../../controllers/product';
import { getReviewListForProduct } from '../../controllers/review';

import ERRORS from '../../constants/errors';

export function setProductsApi(router) {
  router.use('/products', isAuth);

  router.route('/products')
    .get(getProductListTreatment)
    .post(createProductTreatment);

  router.route('/products/:id')
    .all(checkProductTreatment)
    .get(getProductTreatment)
    .put(updateProductTreatment)
    .delete(removeProductTreatment);

  router.route('/products/:id/reviews')
    .get(checkProductTreatment, getProductReviewsTreatment);
}

export async function getProductListTreatment(req, res) {
  try {
    const products = await getProductList();
    sendJsonData(res, { products });
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function checkProductTreatment(req, res, next) {
  try {
    const product = await getProduct(req.params.id);
    if (!product) {
      return sendJsonError(res, ERRORS.PRODUCT_NOT_FOUND, 404);
    }
    req.product = product;
    next();
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function getProductTreatment(req, res) {
  try {
    sendJsonData(res, { product: req.product });
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function getProductReviewsTreatment(req, res) {
  try {
    const reviews = await getReviewListForProduct(req.params.id);
    sendJsonData(res, { reviews });
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function createProductTreatment(req, res) {
  try {
    const product = await createProduct(req.body);
    sendJsonData(res, { product }, 201);
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function updateProductTreatment(req, res) {
  try {
    const product = await updateProduct(req.params.id, req.body);
    sendJsonData(res, { product }, 202);
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function removeProductTreatment(req, res) {
  try {
    await removeProduct(req.product.id);
    sendJsonData(res, { });
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}
