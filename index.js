import * as models from './models';
import { Importer, DirWatcher } from './utils';

const watcher = DirWatcher.watch('./data', 5000);

Importer.createImporter(models, watcher);

watcher.start();
