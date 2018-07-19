import { sendJsonData, sendJsonError } from '../../utils/response';
import { authMiddleware as isAuth, updateDateMiddleware as setUpdateAt } from '../../middlewares';

import {
  getCity, getCityList, createCity, updateCity, removeCity, getRandomCities,
} from '../../controllers/city';

import ERRORS from '../../constants/errors';

export function setCitiesApi(router) {
  router.use('/cities', isAuth);

  /** @swagger
  * /cities:
  *   get:
  *     tags:
  *       - City
  *     summary: Get city list
  *     operationId: cityList
  *     produces:
  *       - application/json
  *     parameters: []
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/CitiesResponse'
  *       401:
  *         description: Unauthorize
  *       500:
  *         description: Server error
  *     security:
  *       - token: []
  *   post:
  *     tags:
  *       - City
  *     summary: Create city
  *     operationId: CreateCity
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - $ref: '#/parameters/UpdatedOrNewCity'
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/CityResponse'
  *       401:
  *         description: Unauthorize
  *       500:
  *         description: Server error
  *     security:
  *       - token: []
  */
  router.route('/cities')
    .get(getCityListTreatment)
    .post(setUpdateAt, createCityTreatment);

  /**
  * @swagger
  * /cities/random:
  *   get:
  *     tags:
  *       - City
  *     summary: Get random city
  *     operationId: RandomCity
  *     produces:
  *       - application/json
  *     parameters: []
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/CityResponse'
  *       401:
  *         description: Unauthorize
  *       500:
  *         description: Server error
  *     security:
  *       - token: []
  */
  router.route('/cities/random')
    .get(getRandomCityTreatment);

  /**
  * @swagger
  *   /cities/{id}:
  *   get:
  *     tags:
  *       - City
  *     summary: Get city
  *     operationId: city
  *     produces:
  *       - application/json
  *     parameters:
  *       - $ref: '#/parameters/CityId'
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/CityResponse'
  *       401:
  *         description: Unauthorize
  *       404:
  *         description: Not found
  *       500:
  *         description: Server error
  *     security:
  *       - token: []
  *   put:
  *     tags:
  *       - City
  *     summary: Update city
  *     operationId: UpdateCity
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - $ref: '#/parameters/CityId'
  *       - $ref: '#/parameters/UpdatedOrNewCity'
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/CityResponse'
  *       401:
  *         description: Unauthorize
  *       404:
  *         description: Not found
  *       500:
  *         description: Server error
  *     security:
  *       - token: []
  *   delete:
  *     tags:
  *       - City
  *     summary: Remove city
  *     operationId: RemoveCity
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - $ref: '#/parameters/CityId'
  *     responses:
  *       200:
  *         description: successful operation
  *         schema:
  *           $ref: '#/responses/EmptyResponse'
  *       401:
  *         description: Unauthorize
  *       404:
  *         description: Not found
  *       500:
  *         description: Server error
  *     security:
  *       - token: []
  */
  router.route('/cities/:id')
    .all(checkCityTreatment)
    .get(getCityTreatment)
    .put(setUpdateAt, updateCityTreatment)
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

export async function getRandomCityTreatment(req, res) {
  try {
    const cities = await getRandomCities();
    sendJsonData(res, { cities });
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function createCityTreatment(req, res) {
  try {
    const city = await createCity(req.body);
    sendJsonData(res, { city }, 201);
  } catch (error) {
    sendJsonError(res, ERRORS.SERVER_ERROR, 500, error);
  }
}

export async function updateCityTreatment(req, res) {
  try {
    const city = await updateCity(req.params.id, req.body);
    sendJsonData(res, { city }, 202);
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
