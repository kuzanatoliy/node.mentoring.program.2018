import models from '../../models';

const { User } = models;

export const COMMON_ATTRIBUTES = ['id', 'outputId', 'email', 'firstName', 'lastName', 'provider', 'role'];
export const SHORT_COMMON_ATTRIBUTES = ['id', 'email', 'firstName', 'lastName'];

export async function getUserOrCreate(userInfo) {
  const { outputId, email, firstName, lastName, provider } = userInfo;
  return User.findOrCreate({
    where: { outputId, provider },
    defaults: { outputId, provider, email, firstName, lastName },
  });
}

export async function findUserById(id) {
  return User.findById(id);
}

export async function getUserByConditions(conditions) {
  return User.findOne({ where: conditions, attributes: COMMON_ATTRIBUTES });
}

export async function getUser(id) {
  return getUserByConditions({ id });
}

export async function getUserByAuthData(email, password) {
  return getUserByConditions({ email, password });
}

export async function getUserByEmail(email) {
  return getUserByConditions({ email, provider: null });
}

export async function createUser(userInfo) {
  const { email, firstName, lastName, password, role } = userInfo;
  return User.create({ email, firstName, lastName, password, role });
}

export async function updateUser(user, userInfo) {
  const { email, firstName, lastName, password, role } = userInfo;
  return user.update({ email, firstName, lastName, password, role });
}

export async function removeUser(id) {
  return User.destroy({ where: { id } });
}

export async function getUserList() {
  return User.findAll({ attributes: SHORT_COMMON_ATTRIBUTES });
}
