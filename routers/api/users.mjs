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

  /**
  * @swagger
  * /users:
  *   get:
  *     tags:
  *       - User
  *     summary: Get user list
  *     operationId: userList
  *     produces:
  *       - application/json
  *     parameters: []
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/UsersResponse'
  *       401:
  *         description: Unauthorize
  *       403:
  *         description: Forbidden
  *       500:
  *         description: Server error
  *     security:
  *       - token: []
  */
  router.route('/users')
    .get(getUserListTreatment);

  /**
  * @swagger
  * /users/{id}:
  *   get:
  *     tags:
  *       - User
  *     summary: Get user
  *     operationId: user
  *     produces:
  *       - application/json
  *     parameters:
  *       - $ref: '#/parameters/UserId'
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/UserResponse'
  *       401:
  *         description: Unauthorize
  *       403:
  *         description: Forbidden
  *       404:
  *         description: Not found
  *       500:
  *         description: Server error
  *     security:
  *       - token: []
  *   put:
  *     tags:
  *       - User
  *     summary: Update user
  *     operationId: UpdateUser
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - $ref: '#/parameters/UserId'
  *       - $ref: '#/parameters/UpdateUserInfo'
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/UserResponse'
  *       401:
  *         description: Unauthorize
  *       403:
  *         description: Forbidden
  *       404:
  *         description: Not found
  *       500:
  *         description: Server error
  *     security:
  *       - token: []
  *   delete:
  *     tags:
  *       - User
  *     summary: Remove user
  *     operationId: RemoveUser
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - $ref: '#/parameters/UserId'
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/EmptyResponse'
  *       401:
  *         description: Unauthorize
  *       403:
  *         description: Forbidden
  *       404:
  *         description: Not found
  *       500:
  *         description: Server error
  *     security:
  *       - token: []
  */
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
