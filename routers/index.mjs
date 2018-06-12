import { setProductsApi } from './products';
import { setUsersApi } from './users';

const apiSetters = [ setProductsApi, setUsersApi ];

export function setApi(router) {
  apiSetters.forEach(item => item(router));
}
