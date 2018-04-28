import fs from 'fs';
import Emitter from 'events';

class DirWatcher {
  constructor(props) {
    this.path = props.path;
    this.delay = props.delay;
    this.emitter = new Emitter();
    props.autostart && this.start();
    this.change = this.change.bind(this);
    this.files = {};
  }

  start() {
    !this.tick && (this.tick = setInterval(this.change, this.delay));
  }

  end() {
    this.tick && clearInterval(this.tick) && (this.tick = undefined);
  }

  change() {
    const files = {};
    const eventParams = [];
    fs.readdirSync(this.path).forEach(item => {
      const path = `${ this.path }/${ item }`;
      const { ino, mtimeMs } = fs.statSync(path);
      files[ino] = { path, mtimeMs };
      if (this.files[ino] && this.files[ino].path === files[ino].path) {
        if (this.files[ino].mtimeMs !== files[ino].mtimeMs) {
          console.log(`File ${ path } was updated`);
          eventParams.push(path);
        }
        this.files[ino] = undefined;
      } else {
        console.log(`File ${ path } was created`);
        eventParams.push(path);
      }
    });
    Object.keys(this.files).forEach(item => { this.files[item] && console.log(`File ${ this.files[item].path } was removed`); });
    this.files = files;
    this.emitter.emit('dirwatcher:change', eventParams);
  }

  static watch(path, delay, autostart = false) {
    return new DirWatcher({
      path,
      delay,
      autostart,
    });
  }

  on(event, callback) {
    this.emitter.on(event, callback);
  }

  once(event, callback) {
    this.emitter.once(event, callback);
  }
}

export default DirWatcher;
