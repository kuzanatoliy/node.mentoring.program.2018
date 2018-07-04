import { sendJsonData, sendJsonError } from '../../utils/response';
import { signJWT } from '../../utils/jwt';
import { isEmail, isPassword } from '../../utils/validation';
import { encoding } from '../../utils/crypto';

import { createUser, getUserByAuthData, getUserByEmail } from '../../controllers/user';

import ERRORS from '../../constants/errors';

export function setAuthApi(router) {
  router.route('/auth/login')
    .post(validationTreatment, loginTreatment)
    .get(infoTreatment);

  router.route('/auth/register')
    .post(validationTreatment, registerTreatment);
}

export async function loginTreatment(req, res) {
  try {
    const { email, password } = req.body;
    const userInfo = await getUserByAuthData(email, password);
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
    const userInfo = await createUser(req.body);
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
    const { token } = req.session;
    if (!token) {
      return sendJsonError(res, ERRORS.FORBIDDEN, 403);
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
    console.log(error);
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}
