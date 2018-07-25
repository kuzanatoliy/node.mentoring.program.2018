import { sendJsonData, sendJsonError } from '../../utils/response';
import { signJWT } from '../../utils/jwt';
import { modelToJSON } from '../../utils/convert';
import { isEmail, isPassword } from '../../utils/validation';
import { encoding } from '../../utils/crypto';

import { createUser, getUserByAuthData, getUserByEmail } from '../../controllers/user';

import ERRORS from '../../constants/errors';

export function setAuthApi(router) {
  /**
  * @swagger
  * /auth/login:
  *   get:
  *     tags:
  *       - Auth
  *     summary: Get data for auth user
  *     operationId: getAuthUserData
  *     produces:
  *       - application/json
  *     parameters: []
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/AuthResponse'
  *       401:
  *         description: Unauthorized
  *       500:
  *         description: Server error
  *   post:
  *     tags:
  *       - Auth
  *     summary: Login user
  *     operationId: login
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - $ref: '#/parameters/UserLoginData'
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/AuthResponse'
  *       400:
  *         description: Invalid request
  *       500:
  *         description: Server error
  */
  router.route('/auth/login')
    .post(validationTreatment, loginTreatment)
    .get(infoTreatment);

  /**
  * @swagger
  * /auth/register:
  *   post:
  *     tags:
  *       - Auth
  *     summary: Login user
  *     operationId: register
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: body
  *         name: body
  *         description: Login user data
  *         required: true
  *         schema:
  *           $ref: '#/definitions/UserRegisterData'
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/AuthResponse'
  *       400:
  *         description: Invalid request
  *       500:
  *         description: Server error
  */
  router.route('/auth/register')
    .post(validationTreatment, registerTreatment);
}

export async function loginTreatment(req, res) {
  try {
    const { email, password } = req.body;
    const userInfo = modelToJSON(await getUserByAuthData(email, password));
    if (!userInfo) {
      return sendJsonError(res, ERRORS.USER_NOT_FOUND);
    }
    const token = signJWT(userInfo);
    req.session.token = token;
    req.session.userInfo = userInfo;
    sendJsonData(res, { userInfo }, 201, token);
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function registerTreatment(req, res) {
  try {
    if (await getUserByEmail(req.body.email)) {
      return sendJsonError(res, ERRORS.EMAIL_EXIST, 409);
    }
    const userInfo = modelToJSON(await createUser(req.body));
    const token = signJWT(userInfo);
    req.session.token = token;
    req.session.userInfo = userInfo;
    sendJsonData(res, { userInfo }, 201, token);
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export function infoTreatment(req, res) {
  try {
    console.log('bugaga');
    const { token } = req.session;
    if (!token) {
      return sendJsonError(res, ERRORS.UNAUTHORIZED, 401);
    }
    sendJsonData(res, { userInfo: req.session.userInfo }, 200, token);
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export function validationTreatment(req, res, next) {
  try {
    const { password, email } = req.body;
    if (!isEmail(email)) {
      return sendJsonError(res, ERRORS.EMAIL_NOT_VALID);
    }
    if (!isPassword(password)) {
      return sendJsonError(res, ERRORS.PASSWORD_NOT_VALID);
    }
    req.body.password = encoding(password);
    next();
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}
