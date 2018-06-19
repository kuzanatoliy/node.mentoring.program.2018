import { setAuthApi } from './auth';
import { setProductsApi } from './products';
import { setUsersApi } from './users';

const apiSetters = [ setAuthApi, setProductsApi, setUsersApi ];

export function setApi(router) {
  apiSetters.forEach(item => item(router));
}
