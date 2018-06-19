import jwt from 'jsonwebtoken';
import { sendJsonData } from '../utils/response';
//import { getUserList } from '../controllers/user';

export function setAuthApi(router) {
  router.route('/auth/login')
    .get(loginTreatment);
}

export function loginTreatment(req, res) {
  const { email, password } = req.body;
  const token = jwt.sign({ email, password }, 'bugaga');
  sendJsonData(res, { token });
}
