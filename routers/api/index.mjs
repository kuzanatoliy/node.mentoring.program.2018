import { setAuthApi } from './auth';
import { setCitiesApi } from './city';
import { setErrorApi } from './error';
import { setProductsApi } from './products';
import { setUsersApi } from './users';

const apiSetters = [ setAuthApi, setProductsApi, setUsersApi, setErrorApi, setCitiesApi ];

export function setApi(router) {
  apiSetters.forEach(item => item(router));
}
