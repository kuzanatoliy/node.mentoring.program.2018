import * as models from './models';
import { Importer, DirWatcher } from './utils';

const watcher = DirWatcher.watch('./data', 5000);

const importer = new Importer(models, watcher);

watcher.start();

console.log(importer.import('./data/products.csv'));
console.log(importer.importSync('./data/products.csv'));
