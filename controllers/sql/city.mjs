import models from '../../models';

const { City } = models;

export const COMMON_ATTRIBUTES = ['id', 'name', 'country', 'capital', 'location'];
export const SHORT_COMMON_ATTRIBUTES = ['id', 'name', 'country'];

export async function findCityById(id) {
  return City.findById(id);
}

export async function getCity(id) {
  return City.findOne({ where: { id }, attributes: COMMON_ATTRIBUTES });
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
  return City.destroy({ where: { id } });
}

export async function getCityList() {
  return City.findAll({ attributes: SHORT_COMMON_ATTRIBUTES });
}
