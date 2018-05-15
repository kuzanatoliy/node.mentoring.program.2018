import * as models from './models';
import { Importer, DirWatcher } from './libs';

const watcher = DirWatcher.watch('./data', 5000);

new Importer(models, watcher);

watcher.start();
