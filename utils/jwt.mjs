import jwt from 'jsonwebtoken';
import APP_CONFIGS from '../configs/app';

const { SECRET_KEY } = APP_CONFIGS;

export const signJWT = data => {
  return jwt.sign(data, SECRET_KEY);
};

export const verifyJWT = token => {
  return jwt.verify(token, SECRET_KEY);
};
