import fs from 'fs';

class DirWotcher {
  constructor(props) {
    this.path = props.path;
    this.delay = props.delay;
    props.autostart && this.start();
  }

  start() {
    console.log('start');
    /*if (!this.watcher) {
      this.wathcer = fs.watch(this.path);
    }*/
  }

  end() {
    console.log('change');
  }

  change() {
    console.log('change');
  }

  static watch(path, delay, autostart = false) {
    return new DirWotcher({
      path,
      delay,
      autostart,
    });
  }
}

export default DirWotcher;
