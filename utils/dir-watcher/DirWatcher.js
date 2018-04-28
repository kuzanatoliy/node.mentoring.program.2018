import fs from 'fs';
import Emitter from 'events';

class DirWatcher {
  constructor(props) {
    this.path = props.path;
    this.delay = props.delay;
    this.emitter = new Emitter();
    props.autostart && this.start();
    this.change = this.change.bind(this);
  }

  start() {
    !this.tick && (this.tick = setInterval(this.change, this.delay));
  }

  end() {
    this.tick && clearInterval(this.tick) && (this.tick = undefined);
  }

  change() {
    console.log(fs.readdirSync(this.path));
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
