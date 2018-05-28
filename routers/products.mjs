import { sendJsonData } from '../utils/response';

export function setProductsApi(router) {
  router.route('/products')
    .get(getProductListTreatment)
    .post(createProductTreatment);

  router.route('/products/:id')
    .get(getProductTreatment);

  router.route('/products/:id/reviews')
    .get(getProductReviewsTreatment);
}

export function getProductListTreatment(req, res) {
  sendJsonData(res, { result: 'getProductListTreatment' });
}

export function getProductTreatment(req, res) {
  sendJsonData(res, { result: 'getProductTreatment' });
}

export function getProductReviewsTreatment(req, res) {
  sendJsonData(res, { result: 'getProductReviewsTreatment' });
}

export function createProductTreatment(req, res) {
  sendJsonData(res, { result: 'createProductTreatment' });
}
