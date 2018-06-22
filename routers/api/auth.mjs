import { sendJsonData, sendJsonError } from '../../utils/response';
import { signJWT } from '../../utils/jwt';
import ERRORS from '../../constants/errors';

export function setAuthApi(router) {
  router.route('/auth/login')
    .post(loginTreatment)
    .get(infoTreatment);
}

export function loginTreatment(req, res) {
  try {
    const { email, password } = req.body;
    const token = signJWT({ email, password });
    req.session.token = token;
    sendJsonData(res, { token, data: { email } });
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export function infoTreatment(req, res) {
  try {
    const { token } = req.session;
    if (!token) {
      sendJsonError(res, ERRORS.FORBIDDEN, 403);
    }
    sendJsonData(res, { token });
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}
