import { sendJsonData, sendJsonError } from '../../utils/response';
import {
  authMiddleware as isAuth,
  adminMiddleware as isAdmin,
  updateDateMiddleware as setUpdateAt,
} from '../../middlewares';

import {
  getUser, getUserList, updateUser, removeUser,
} from '../../controllers/user';

import ERRORS from '../../constants/errors';

export function setUsersApi(router) {
  router.use('/users', isAuth, isAdmin);

  router.route('/users')
    .get(getUserListTreatment);

  router.route('/users/:id')
    .all(checkUserTreatment)
    .get(getUserTreatment)
    .put(setUpdateAt, updateUserTreatment)
    .delete(removeUserTreatment);
}

export async function getUserListTreatment(req, res) {
  try {
    const users = await getUserList();
    sendJsonData(res, { users });
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function checkUserTreatment(req, res, next) {
  try {
    const user = await getUser(req.params.id);
    if (!user) {
      return sendJsonError(res, ERRORS.USER_NOT_FOUND, 404);
    }
    req.user = user;
    next();
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function getUserTreatment(req, res) {
  try {
    sendJsonData(res, { user: req.user });
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function updateUserTreatment(req, res) {
  try {
    const user = await updateUser(req.params.id, req.body);
    sendJsonData(res, { user }, 202);
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function removeUserTreatment(req, res) {
  try {
    await removeUser(req.user.id);
    sendJsonData(res, { });
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}
