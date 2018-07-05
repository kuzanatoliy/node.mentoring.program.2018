import { setAuthApi } from './auth';
import { setCitiesApi } from './cities';
import { setErrorApi } from './error';
import { setProductsApi } from './products';
import { setUsersApi } from './users';

const apiSetters = [ setAuthApi, setCitiesApi, setProductsApi, setUsersApi, setErrorApi ];

export function setApi(router) {
  apiSetters.forEach(item => item(router));
}
