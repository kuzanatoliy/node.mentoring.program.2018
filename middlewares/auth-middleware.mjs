import { verifyJWT } from '../utils/jwt';
import { sendJsonError } from '../utils/response';
import ERRORS from '../constants/errors';

export default (req, res, next) => {
  try {
    const { token } = req.query;
    req.user = verifyJWT(token);
    next();
  } catch (error) {
    sendJsonError(res, ERRORS.FORBIDDEN, 403);
  }
};
