import minimist from 'minimist';
import through2 from 'through2';
import fs from 'fs';
import { PARAMS_INDEXES, COMMANDS, SHORT_COMMANDS } from './constants';
import { strTransfer, csvToJsonTransfer, simpleTransfer } from './transfers';
import { helpShow } from './help';
import * as models from '../../models';
import Commander from '../../libs/commander';

const actions = new Commander();

actions.add('reverse', 'Reversing string', () => {
  strTransfer(process.stdin, process.stdout, buffer => `Reversed: ${ buffer.reverse() }\r\n`);
});

actions.add('transform', 'Transforming string into upper-case', () => {
  strTransfer(process.stdin, process.stdout, buffer => `Upper-cased:\r\n${ buffer.toString().toUpperCase() }`);
});

actions.add('outputFile', 'Show file', (filePath) => {
  simpleTransfer(fs.createReadStream(filePath), process.stdout);
});

actions.add('convertFromFile', 'Convert csv data to json', (filePath) => {
  csvToJsonTransfer(fs.createReadStream(filePath), process.stdout);
});

actions.add('convertToFile', 'Convert csv data to json and save into file', () => {
  csvToJsonTransfer(fs.createReadStream(filePath), fs.createWriteStream(filePath.replace('.csv','.json')));
});

const params = minimist(process.argv.slice(2));
const paramsKeys = Object.keys(params);

switch (paramsKeys[PARAMS_INDEXES.FIRST]) {
  case COMMANDS.ACTION:
  case SHORT_COMMANDS.ACTION:
    actions.make(
      params[paramsKeys[PARAMS_INDEXES.FIRST]],
      [params[paramsKeys[PARAMS_INDEXES.SECOND]]],
    );
    break;
  case COMMANDS.HELP:
  case SHORT_COMMANDS.HELP:
    console.log('help');
    break;
  default:
    console.error('Command not found');
    console.log('help');
}
