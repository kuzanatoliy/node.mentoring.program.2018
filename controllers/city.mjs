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

export async function getRandomCities() {
  return City.aggregate().sample(1).exec();
}

export async function createCity(city) {
  const { name, country, capital, location, updateAt } = city;
  return City.create({ name, country, capital, location, updateAt });
}

export async function updateCity(id, params) {
  const { name, country, capital, location, updateAt } = params;
  return City.findOneAndUpdate(
    { _id: id },
    { $set: { name, country, capital, location, updateAt } },
    { new: true, fields: COMMON_ATTRIBUTES },
  ).exec();
}

export async function removeCity(id) {
  return City.remove({ _id: id }).exec();
}

export async function getCityList() {
  return City.find({}, SHORT_COMMON_ATTRIBUTES).exec();
}
