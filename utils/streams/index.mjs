import minimist from 'minimist';
import fs from 'fs';
import request from 'request';
import { OPTIONS, PARAMS_INDEXES, EPAM_CSS_FILE } from './constants';
import {
  strTransfer, csvToJsonTransfer, simpleTransfer, combinedTransfer,
} from './transfers';
import { helpShow } from './help';
import Commander from '../../libs/commander';
import { COMMANDS } from './constants.mjs';

const actions = new Commander();

actions.add('reverse', 'Reversing string', () => {
  strTransfer(process.stdin, process.stdout, buffer => `Reversed: ${ buffer.reverse() }\r\n`);
});

actions.add('transform', 'Transforming string into upper-case', () => {
  strTransfer(process.stdin, process.stdout, buffer => `Upper-cased:\r\n${ buffer.toString().toUpperCase() }`);
});

actions.add('outputFile', 'Show file', ({ file }) => {
  simpleTransfer(fs.createReadStream(file), process.stdout);
});

actions.add('convertFromFile', 'Convert csv data to json. Need file path (--file)', ({ file }) => {
  csvToJsonTransfer(fs.createReadStream(file), process.stdout);
});

actions.add('convertToFile', 'Convert csv data to json and save into file. Need file path (--file)', ({ file }) => {
  csvToJsonTransfer(fs.createReadStream(file), fs.createWriteStream(file.replace('.csv', '.json')));
});

actions.add('bundleCSS', 'Bundle CSS. Need path (--path)', ({ path }) => {
  const outStr = fs.createWriteStream(path + '/bundle.css');
  const inStrs = [];
  fs.readdirSync(path).forEach(item => {
    if (/.css$/.test(item)) {
      inStrs.push(fs.createReadStream(`${ path }/${ item }`));
    }
  });
  inStrs.push(request(EPAM_CSS_FILE));
  combinedTransfer(inStrs, outStr);
});

const params = minimist(process.argv.slice(2), OPTIONS);
const paramsKeys = Object.keys(params);
const firstParam = paramsKeys[PARAMS_INDEXES.FIRST];
const secondParam = paramsKeys[PARAMS_INDEXES.SECOND];

const writeHelp = () => {
  console.log(`Params:\r\n${ helpShow() }`);
  console.log(`Actions:\r\n${ actions.help() }`);
};

if (firstParam && paramsKeys[PARAMS_INDEXES.FIRST] === COMMANDS.ACTION) {
  const action = params[firstParam];
  if (secondParam && paramsKeys[PARAMS_INDEXES.FIRST] === COMMANDS.HELP) {
    const result = actions.help(action);
    if (!actions.isCommand(action)) {
      console.log(`Action ${ action } not found`);
    }
    console.log(result);
  } else {
    if (!actions.isCommand(action)) {
      console.log(`Action ${ action } not found`);
      console.log(actions.help());
    } else {
      actions.make(action, params);
    }
  }
} else {
  const help = params[secondParam];
  if (help && paramsKeys[PARAMS_INDEXES.FIRST] === COMMANDS.HELP) {
    if(help) {
      console.log(`Key ${ key } not found`);
    }
    console.log(helpShow(help));
  } else {
    console.log(`Params:\r\n${ helpShow() }`);
    console.log(`Actions:\r\n${ actions.help() }`);
  }
}
