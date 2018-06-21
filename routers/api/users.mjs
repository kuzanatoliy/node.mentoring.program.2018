import { sendJsonData } from '../../utils/response';
import { getUserList } from '../../controllers/user';
import { isJWTAuthorized } from '../../utils/authorized';

export function setUsersApi(router) {
  router.use(isJWTAuthorized);

  router.route('/users')
    .get(getUserListTreatment);
}

export async function getUserListTreatment(req, res) {
  sendJsonData(res, { users: await getUserList() });
}
