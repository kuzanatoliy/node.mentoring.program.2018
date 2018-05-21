import minimist from 'minimist';
import through2 from 'through2';
import fs from 'fs';
import { PARAMS_INDEXES, COMMANDS, SHORT_COMMANDS } from './constants';
import * as models from '../../models';

const params = minimist(process.argv.slice(2));
const paramsKeys = Object.keys(params);

switch (paramsKeys[PARAMS_INDEXES.FIRST]) {
  case COMMANDS.ACTION:
  case SHORT_COMMANDS.ACTION:
    switch (params[paramsKeys[PARAMS_INDEXES.FIRST]]) {
      case 'reverse':
        reverse();
        break;
      case 'transform':
        transform();
        break;
      case 'outputFile':
        outputFile(params[paramsKeys[PARAMS_INDEXES.SECOND]]);
        break;
      case 'convertFromFile':
        convertFromFile(params[paramsKeys[PARAMS_INDEXES.SECOND]]);
        break;
      case 'convertToFile':
        convertToFile(params[paramsKeys[PARAMS_INDEXES.SECOND]]);
        break;
    }
    break;
  case COMMANDS.HELP:
  case SHORT_COMMANDS.HELP:
    console.log('help');
    break;
  default:
    console.error('Command not found');
    console.log('help');
}

function reverse() {
  process.stdin.pipe(through2(function (chunk, end, callback) {
    this.push(`Reversed: ${ chunk.reverse() }\n`);
    process.stdin.end();
  })).pipe(process.stdout);
}

function transform() {
  process.stdin.pipe(through2(function(chunk, end, callback) {
    this.push(`Upper-cased:\n${ chunk.toString().toUpperCase() }`);
    process.stdin.end();
  })).pipe(process.stdout);
}

function outputFile(filePath) {
  fs.createReadStream(filePath).pipe(process.stdout);
}

function convertFromFile(filePath) {
  fs.createReadStream(filePath).pipe(through2(function(chunk, end, callback) {
    const lines = chunk.toString().split('\r\n');
    const Model = models[lines[0]];
    const result = [];
    for (let i = 1; i < lines.length; i++) {
      result.push(Model.createCSV(lines[i]).toJSON());
    }
    this.push(JSON.stringify(result));
    callback();
  })).pipe(process.stdout);
}

function convertToFile(filePath) {
  fs.createReadStream(filePath).pipe(through2(function(chunk, end, callback) {
    const lines = chunk.toString().split('\r\n');
    const Model = models[lines[0]];
    const result = [];
    for (let i = 1; i < lines.length; i++) {
      result.push(Model.createCSV(lines[i]).toJSON());
    }
    this.push(JSON.stringify(result));
    callback();
  })).pipe(fs.createWriteStream(filePath.replace('.csv', '.json')));
}
