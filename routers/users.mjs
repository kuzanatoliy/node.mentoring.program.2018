import { sendJsonData } from '../utils/response';

export function setUsersApi(router) {
  router.route('/users')
    .get(getUserListTreatment);
}

export function getUserListTreatment(req, res) {
  sendJsonData(res, { result: 'getUserListTreatment' });
}
