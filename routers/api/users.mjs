import { sendJsonData, sendJsonError } from '../../utils/response';
import { authMiddleware as isAuth } from '../../middlewares';

import { getUserList } from '../../controllers/user';

import ERRORS from '../../constants/errors';

export function setUsersApi(router) {
  router.use('/users', isAuth);

  router.route('/users')
    .get(getUserListTreatment);
}

export async function getUserListTreatment(req, res) {
  try {
    const users = await getUserList();
    sendJsonData(res, { users });
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}
