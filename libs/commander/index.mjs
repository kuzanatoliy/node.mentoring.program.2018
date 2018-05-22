export default class Commander {
  constructor() {
    this.commands = new Map();
  }

  add (command, description, action) {
    this.commands.set(command, { description, action });
    return this;
  }

  remove (command) {
    this.commands.delete(command);
    return this;
  }

  help () { 
    const result = "";
    this.commands.forEach((item, key) => result += `${ key }: ${ item.description }\r\n`);
    return result;
  }

  make (command, arg) {
    const item = this.commands.get(command);
    if(item) {
      item.action.apply(this, arg);
      return true;
    } else {
      return false;
    }
  }

  isCommand (command) {
    return !!this.commands.get(command);
  }
}

export const createCommander = () => new Commander();
