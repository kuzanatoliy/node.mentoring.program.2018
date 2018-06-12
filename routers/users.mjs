import { sendJsonData } from '../utils/response';
import { getUserList } from '../controllers/user';

export function setUsersApi(router) {
  router.route('/users')
    .get(getUserListTreatment);
}

export async function getUserListTreatment(req, res) {
  sendJsonData(res, { users: await getUserList() });
}
