import { sendJsonData } from '../utils/response';
import { signJWT } from '../utils/jwt';

export function setAuthApi(router) {
  router.route('/auth/login')
    .get(loginTreatment);
}

export function loginTreatment(req, res) {
  const { email, password } = req.body;
  const token = signJWT({ email, password });
  sendJsonData(res, { token });
}
