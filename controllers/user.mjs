import models from '../models';

const { User } = models;

export function getUserOrCreate(userInfo) {
  const { outputId, email, firstName, lastName, provider } = userInfo;
  return User.findOrCreate({
    where: { outputId, provider },
    defaults: { outputId, provider, email, firstName, lastName },
  });
}

export function createUser(userInfo) {
  const { email, firstName, lastName, password, role } = userInfo;
  return User.create({
    email,
    firstName,
    lastName,
    password,
    role,
  });
}

export function getUser(id) {
  return User.findOne({ where: { id } });
}

export function getUserList() {
  return User.findAll();
}
