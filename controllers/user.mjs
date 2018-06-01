import models from '../models';

const { User } = models;

export function getUser(id) {
  User.findOne({ where: { id } });
};

export function getUserList() {
  User.findAll();
}
