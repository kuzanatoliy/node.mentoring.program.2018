import appConfig from './config/app';
import { User, Product } from './models';

console.log(`Project name: ${ appConfig.name }`);
console.log(`User: ${ new User({ firstName: 'First', lastName: 'Last', email: 'Email@mail' }) }`);
console.log(`Product ${ new Product({ name: 'Product' }) }`);
