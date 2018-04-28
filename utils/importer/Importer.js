import fs from 'fs';

class Importer {
  constructor(models, watcher) {
    this.models = models;
    watcher && watcher.on('dirwatcher:change', () => {
      console.log('event');
    });
  }

  _readFile(path) {
    const data = fs.readFileSync(path).toString().split('\r\n').reverse();
    return this.models[data.pop()].bulkCreateCSV(data);
  }

  async import(path) {
    await this._readFile(path);
  }

  importSync(path) {
    return this._readFile(path);
  }
}

export default Importer;
