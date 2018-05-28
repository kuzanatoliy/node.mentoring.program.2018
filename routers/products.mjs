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
  res.send('getProductListTreatment');
}

export function getProductTreatment(req, res) {
  res.send('getProductTreatment');
}

export function getProductReviewsTreatment(req, res) {
  res.send('getProductReviewsTreatment');
}

export function createProductTreatment(req, res) {
  res.send('createProductTreatment');
}
