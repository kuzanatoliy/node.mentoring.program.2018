import fs from 'fs';
import Emitter from 'events';

class DirWatcher extends Emitter {
  constructor(props) {
    super(props);
    this.path = props.path;
    this.delay = props.delay;
    this.change = this.change.bind(this);
    this.files = {};
    props.autostart && this.start();
    console.log(`whatcher created for directory ${ this.path }`);
  }

  start() {
    !this.tick && (this.tick = setInterval(this.change, this.delay)) && this.change();
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
    this.emit('dirwatcher:change', eventParams);
  }

  static watch(path, delay, autostart = false) {
    return new DirWatcher({
      path,
      delay,
      autostart,
    });
  }
}

export default DirWatcher;
