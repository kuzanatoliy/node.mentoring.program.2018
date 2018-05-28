export function setUsersApi(router) {
  router.route('/users')
    .get(getUserListTreatment);
}

export function getUserListTreatment(req, res) {
  res.send('getUserListTreatment');
}
