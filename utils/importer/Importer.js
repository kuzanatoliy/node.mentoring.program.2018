import fs from 'fs';

class Importer {
  constructor(models, watcher) {
    this.models = models;
    this.import = this.import.bind(this);
    this.importSync = this.importSync.bind(this);
    watcher && watcher.on('dirwatcher:change', event => {
      event.forEach(async item => console.log(await this.import(item)));
    });
  }

  _readFile(path) {
    const data = fs.readFileSync(path).toString().split('\r\n').reverse();
    return this.models[data.pop()].bulkCreateCSV(data);
  }

  async import(path) {
    const result = await this._readFile(path);
    return result;
  }

  importSync(path) {
    return this._readFile(path);
  }

  static createImporter(models, watcher) {
    return new Importer(models, watcher);
  }
}

export default Importer;
