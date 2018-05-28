import minimist from 'minimist';
import fs from 'fs';
import request from 'request';
import { OPTIONS, PARAMS_INDEXES, EPAM_CSS_FILE, COMMANDS } from './constants';
import {
  strTransfer, csvToJsonTransfer, simpleTransfer, combinedTransfer,
} from './transfers';
import { helpShow } from './help';
import Commander from '../../libs/commander';

const actions = new Commander();

const errorHandler = err => {
  console.log(err.message);
  console.log(`Params:\r\n${ helpShow() }`);
  console.log(`Actions:\r\n${ actions.help() }`);
};

actions.add('reverse', 'Reversing string', () => {
  strTransfer(process.stdin, process.stdout, buffer => `Reversed: ${ buffer.reverse() }\r\n`, errorHandler);
});

actions.add('transform', 'Transforming string into upper-case', () => {
  strTransfer(process.stdin, process.stdout, buffer => `Upper-cased:\r\n${ buffer.toString().toUpperCase() }`, errorHandler);
});

actions.add('outputFile', 'Show file', ({ file }, errorHandler) => {
  if (file) {
    simpleTransfer(fs.createReadStream(file), process.stdout);
  } else {
    throw new Error('Function outputFile not found path key');
  }
});

actions.add('convertFromFile', 'Convert csv data to json. Need file path (--file)', ({ file }) => {
  if (file) {
    csvToJsonTransfer(fs.createReadStream(file), process.stdout, errorHandler);
  } else {
    throw new Error('Function convertFromFile not found file key');
  }
});

actions.add('convertToFile', 'Convert csv data to json and save into file. Need file path (--file)', ({ file }) => {
  if (file) {
    csvToJsonTransfer(fs.createReadStream(file), fs.createWriteStream(file.replace('.csv', '.json')), errorHandler);
  } else {
    throw new Error('Function convertToFile not found file key');
  }
});

actions.add('bundleCSS', 'Bundle CSS. Need path (--path)', ({ path }, errorHandler) => {
  if (path) {
    const outStr = fs.createWriteStream(path + '/bundle.css');
    const inStrs = [];
    fs.readdirSync(path).forEach(item => {
      if (/.css$/.test(item)) {
        inStrs.push(fs.createReadStream(`${ path }/${ item }`));
      }
    });
    inStrs.push(request(EPAM_CSS_FILE));
    combinedTransfer(inStrs, outStr);
  } else {
    throw new Error('Function bundleCSS not found path key');
  }
});

const params = minimist(process.argv.slice(2), OPTIONS);
const paramsKeys = Object.keys(params);
const firstParam = paramsKeys[PARAMS_INDEXES.FIRST];
const secondParam = paramsKeys[PARAMS_INDEXES.SECOND];

try {
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
      if (help) {
        console.log(`Key ${ help } not found`);
      }
      console.log(helpShow(help));
    } else {
      console.log(`Params:\r\n${ helpShow() }`);
      console.log(`Actions:\r\n${ actions.help() }`);
    }
  }
} catch (err) {
  errorHandler(err);
}
