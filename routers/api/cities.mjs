import { sendJsonData, sendJsonError } from '../../utils/response';
import { authMiddleware as isAuth } from '../../middlewares';

import {
  getCity, getCityList, createCity, updateCity, removeCity,
} from '../../controllers/city';

import ERRORS from '../../constants/errors';

export function setCitiesApi(router) {
  router.use('/cities', isAuth);

  router.route('/cities')
    .get(getCityListTreatment)
    .post(createCityTreatment);

  router.route('/cities/:id')
    .all(checkCityTreatment)
    .get(getCityTreatment)
    .put(updateCityTreatment)
    .delete(removeCityTreatment);
}

export async function getCityListTreatment(req, res) {
  try {
    const cities = await getCityList();
    sendJsonData(res, { cities });
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function checkCityTreatment(req, res, next) {
  try {
    const city = await getCity(req.params.id);
    if (!city) {
      return sendJsonError(res, ERRORS.CITY_NOT_FOUND, 404);
    }
    req.city = city;
    next();
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function getCityTreatment(req, res) {
  try {
    sendJsonData(res, { city: req.city });
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function createCityTreatment(req, res) {
  try {
    const product = await createCity(req.body);
    sendJsonData(res, { product }, 201);
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function updateCityTreatment(req, res) {
  try {
    const product = await updateCity(req.city, req.body);
    sendJsonData(res, { product }, 202);
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function removeCityTreatment(req, res) {
  try {
    await removeCity(req.city.id);
    sendJsonData(res, { });
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}
