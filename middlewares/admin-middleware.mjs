import { sendJsonError } from '../utils/response';
import ERRORS from '../constants/errors';
import ROLES from '../constants/user-roles';

export default (req, res, next) => {
  try {
    const { userInfo } = req.session;
    if (userInfo && userInfo.role === ROLES.ADMIN) {
      return next();
    }
    sendJsonError(res, ERRORS.FORBIDDEN, 403);
  } catch (error) {
    sendJsonError(res, ERRORS.ERRORS.SERVER_ERROR, 500, error);
  }
};
