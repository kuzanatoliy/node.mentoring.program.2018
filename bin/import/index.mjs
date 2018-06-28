import minimist from 'minimist';
import fs from 'fs';
import models from '../../models';
import { jsonTransfer } from '../../utils/transfers';

const { model, file } = minimist(process.argv.slice(2));

const dataHandler = data => {
  return models[model].create(data);
};

try {
  jsonTransfer(fs.createReadStream(file), dataHandler);
} catch (error) {
  console.log(error);
}
