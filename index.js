import * as models from './models';

/*console.log(`Project name: ${ appConfig.name }`);
console.log(`User: ${ new User({ firstName: 'First', lastName: 'Last', email: 'Email@mail' }) }`);
console.log(`Product: ${ new Product({ name: 'Product', description: 'Description for Product' }) }`);*/

import { Importer, DirWotcher } from './utils';

const whatcher = DirWotcher.watch('./data/products.csv', 100, true);

const importer = new Importer(models);

whatcher.start();

console.log(importer.import('./data/products.csv'));
console.log(importer.importSync('./data/products.csv'));
