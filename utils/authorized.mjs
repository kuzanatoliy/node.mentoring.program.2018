import { verifyJWT } from './jwt';
import { sendJsonError } from './response';
import ERRORS from '../constants/errors';

export const isJWTAuthorized = (req, res, next) => {
  try {
    const { token } = req.query;
    req.user = verifyJWT(token);
    next();
  } catch (error) {
    sendJsonError(res, ERRORS.FORBIDDEN, 403);
  }
};
