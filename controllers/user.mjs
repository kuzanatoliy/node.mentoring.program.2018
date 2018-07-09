import models from '../models';

const { User } = models;

export const COMMON_ATTRIBUTES = ['_id', 'outputId', 'email', 'firstName', 'lastName', 'provider', 'role'];
export const SHORT_COMMON_ATTRIBUTES = ['_id', 'email', 'firstName', 'lastName'];

export async function getUserOrCreate(userInfo) {
  const { outputId, email, firstName, lastName, provider, updateAt } = userInfo;
  return User.findOneAndUpdate(
    { outputId, provider },
    { $set: { outputId, provider, email, firstName, lastName, updateAt } },
    { new: true, upsert: true, setDefaultsOnInsert: true, fields: COMMON_ATTRIBUTES },
  ).exec();
}

export function prepareUser(user) {
  const { _id, email, firstName, lastName, role } = user;
  return { _id, email, firstName, lastName, role };
}

export async function findUserById(id) {
  return User.findById(id).exec();
}

export async function getUserByConditions(conditions) {
  return User.findOne(conditions, COMMON_ATTRIBUTES).exec();
}

export async function getUser(id) {
  return getUserByConditions({ _id: id });
}

export async function getUserByAuthData(email, password) {
  return getUserByConditions({ email, password });
}

export async function getUserByEmail(email) {
  return getUserByConditions({ email, provider: null });
}

export async function createUser(userInfo) {
  const { email, firstName, lastName, password, role, updateAt } = userInfo;
  return User.create({ email, firstName, lastName, password, role, updateAt })
    .then(prepareUser);
}

export async function updateUser(id, userInfo) {
  const { email, firstName, lastName, role, updateAt } = userInfo;
  return User.findOneAndUpdate(
    { _id: id },
    { $set: { email, firstName, lastName, role, updateAt } },
    { new: true, fields: COMMON_ATTRIBUTES },
  ).exec();
}

export async function removeUser(id) {
  return User.remove({ _id: id }).exec();
}

export async function getUserList() {
  return User.find({}, SHORT_COMMON_ATTRIBUTES).exec();
}
