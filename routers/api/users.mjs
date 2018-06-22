import { sendJsonData } from '../../utils/response';
import { getUserList } from '../../controllers/user';
import { authMiddleware as isAuth } from '../../middlewares';

export function setUsersApi(router) {
  router.use(isAuth);

  router.route('/users')
    .get(getUserListTreatment);
}

export async function getUserListTreatment(req, res) {
  sendJsonData(res, { users: await getUserList() });
}
