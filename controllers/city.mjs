import models from '../models';

const { City } = models;

export const COMMON_ATTRIBUTES = ['id', 'name', 'country', 'capital', 'location'];
export const SHORT_COMMON_ATTRIBUTES = ['id', 'name', 'country'];

export async function findCityById(id) {
  return City.findById({ _id: id }).exec();
}

export async function getCity(id) {
  return City.findOne({ _id: id }, COMMON_ATTRIBUTES).exec();
}

export async function createCity(city) {
  const { name, country, capital, location } = city;
  return City.create({ name, country, capital, location });
}

export async function updateCity(city, params) {
  const { name, country, capital, location } = params;
  return city.update({ name, country, capital, location });
}

export async function removeCity(id) {
  return City.remove({ _id: id }).exec();
}

export async function getCityList() {
  return City.findAll({}, SHORT_COMMON_ATTRIBUTES).exec();
}
