import { sendJsonError } from '../../utils/response';
import ERRORS from '../../constants/errors';

export function setErrorApi(router) {
  router.use('/*', notFoundTreatment);
}

export function notFoundTreatment(req, res) {
  return sendJsonError(res, ERRORS.NOT_FOUND, 404);
}
