import models from '../models';

const { User } = models;

export function getUser(id) {
  return User.findOne({ where: { id } });
};

export function getUserList() {
  return User.findAll();
}
