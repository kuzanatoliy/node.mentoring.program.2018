import { sendJsonData, sendJsonError } from '../../utils/response';
import { authMiddleware as isAuth, updateDateMiddleware as setUpdateAt } from '../../middlewares';

import {
  getProduct, getProductList, createProduct, updateProduct, removeProduct,
} from '../../controllers/product';
import { getReviewListForProduct } from '../../controllers/review';

import ERRORS from '../../constants/errors';

export function setProductsApi(router) {
  router.use('/products', isAuth);

  /**
  * @swagger
  * /products:
  *   get:
  *     tags:
  *       - Product
  *     summary: Get product list
  *     operationId: productList
  *     produces:
  *       - application/json
  *     parameters: []
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/ProductsResponse'
  *       401:
  *         description: Unauthorize
  *       500:
  *         description: Server error
  *     security:
  *       - token: []
  *   post:
  *     tags:
  *       - Product
  *     summary: Create product
  *     operationId: CreateProduct
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - $ref: '#/parameters/UpdateOrNewProduct'
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/ProductResponse'
  *       401:
  *         description: Unauthorize
  *       500:
  *         description: Server error
  *     security:
  *       - token: []
  */
  router.route('/products')
    .get(getProductListTreatment)
    .post(setUpdateAt, createProductTreatment);

  /**
  * @swagger
  * /products/{id}:
  *   get:
  *     tags:
  *       - Product
  *     summary: Get product
  *     operationId: product
  *     produces:
  *       - application/json
  *     parameters:
  *       - $ref: '#/parameters/ProductId'
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/ProductResponse'
  *       401:
  *         description: Unauthorize
  *       404:
  *         description: Not found
  *       500:
  *         description: Server error
  *     security:
  *       - token: []
  *   put:
  *     tags:
  *       - Product
  *     summary: Update product
  *     operationId: UpdateProduct
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - $ref: '#/parameters/ProductId'
  *       - $ref: '#/parameters/UpdateOrNewProduct'
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/ProductResponse'
  *       401:
  *         description: Unauthorize
  *       404:
  *         description: Not found
  *       500:
  *         description: Server error
  *     security:
  *       - token: []
  *   delete:
  *     tags:
  *       - Product
  *     summary: Remove product
  *     operationId: RemoveProduct
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - $ref: '#/parameters/ProductId'
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/EmptyResponse'
  *       401:
  *         description: Unauthorize
  *       404:
  *         description: Not found
  *       500:
  *         description: Server error
  *     security:
  *       - token: []
  */
  router.route('/products/:id')
    .all(checkProductTreatment)
    .get(getProductTreatment)
    .put(setUpdateAt, updateProductTreatment)
    .delete(removeProductTreatment);

  /**
  * @swagger
  * /products/{id}/reviews:
  *   get:
  *     tags:
  *       - Product
  *     summary: Get product reviews
  *     operationId: productReviews
  *     produces:
  *       - application/json
  *     parameters:
  *       - $ref: '#/parameters/ProductId'
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/ReviewsResponse'
  *       401:
  *         description: Unauthorize
  *       404:
  *         description: Not found
  *       500:
  *         description: Server error
  *     security:
  *       - token: []
  */
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
