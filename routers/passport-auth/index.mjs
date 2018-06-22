import { setGoogleAuth } from './google';
// import { setErrorApi } from './error';
// import { setProductsApi } from './products';
// import { setUsersApi } from './users';

const apiSetters = [ setGoogleAuth ];

export function setAuth(router) {
  apiSetters.forEach(item => item(router));
}
