import { sendJsonData } from '../../utils/response';
import { getProduct, getProductList, createProduct } from '../../controllers/product';
import { getReviewListForProduct } from '../../controllers/review';

export function setProductsApi(router) {
  router.route('/products')
    .get(getProductListTreatment)
    .post(createProductTreatment);

  router.route('/products/:id')
    .get(getProductTreatment);

  router.route('/products/:id/reviews')
    .get(getProductReviewsTreatment);
}

export async function getProductListTreatment(req, res) {
  sendJsonData(res, { result: await getProductList() });
}

export async function getProductTreatment(req, res) {
  sendJsonData(res, { product: await getProduct(req.params.id) });
}

export async function getProductReviewsTreatment(req, res) {
  sendJsonData(res, { reviews: await getReviewListForProduct(req.params.id) });
}

export async function createProductTreatment(req, res) {
  sendJsonData(res, { product: await createProduct(req.body) });
}
