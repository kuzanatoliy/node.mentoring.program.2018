import minimist from 'minimist';
import fs from 'fs';
import request from 'request';
import { PARAMS_INDEXES, COMMANDS, SHORT_COMMANDS, EPAM_CSS_FILE } from './constants';
import { strTransfer, csvToJsonTransfer, simpleTransfer } from './transfers';
import { helpShow } from './help';
import Commander from '../../libs/commander';

const actions = new Commander();

actions.add('reverse', 'Reversing string', () => {
  strTransfer(process.stdin, process.stdout, buffer => `Reversed: ${ buffer.reverse() }\r\n`);
});

actions.add('transform', 'Transforming string into upper-case', () => {
  strTransfer(process.stdin, process.stdout, buffer => `Upper-cased:\r\n${ buffer.toString().toUpperCase() }`);
});

actions.add('outputFile', 'Show file', filePath => {
  simpleTransfer(fs.createReadStream(filePath), process.stdout);
});

actions.add('convertFromFile', 'Convert csv data to json', (filePath) => {
  csvToJsonTransfer(fs.createReadStream(filePath), process.stdout);
});

actions.add('convertToFile', 'Convert csv data to json and save into file', filePath => {
  csvToJsonTransfer(fs.createReadStream(filePath), fs.createWriteStream(filePath.replace('.csv', '.json')));
});

actions.add('bundleCSS', 'Bundle CSS', path => {
  const outStr = fs.createWriteStream(path + '/bundle.css');
  fs.readdirSync(path).forEach(item => {
    const inStr = fs.createReadStream(`${ path }/${ item }`);
    simpleTransfer(inStr, outStr);
  });
  simpleTransfer(
    request(EPAM_CSS_FILE),
    fs.createWriteStream(path + '/bundle.css', { flags: 'a' })
  );
});

const params = minimist(process.argv.slice(2));
const paramsKeys = Object.keys(params);
const firstKey = paramsKeys[PARAMS_INDEXES.FIRST];
const secondKey = paramsKeys[PARAMS_INDEXES.SECOND];

switch (firstKey) {
  case COMMANDS.ACTION:
  case SHORT_COMMANDS.ACTION:
    switch (secondKey) {
      case COMMANDS.HELP:
      case SHORT_COMMANDS.HELP:
        console.log(actions.help(params[firstKey]));
        break;
      default:
        try {
          actions.make(params[firstKey], [params[secondKey]]);
        } catch (exception) {
          console.log(exception);
          console.log(helpShow(COMMANDS.ACTION));
          console.log(actions.help(params[firstKey]));
        }
    }
    break;
  case COMMANDS.HELP:
  case SHORT_COMMANDS.HELP:
    console.log(helpShow(params[paramsKeys[PARAMS_INDEXES.FIRST]]));
    break;
  default:
    console.error('Command not found');
    console.log(helpShow());
}
