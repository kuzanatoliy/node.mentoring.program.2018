import minimist from 'minimist';
import fs from 'fs';
import models from '../../models';
import { csvModelTransfer } from '../../utils/transfers';
import getPrepareFunc from './prepare-params';

const { model, file } = minimist(process.argv.slice(2));

const dataHandler = data => {
  return models[model].create(data);
};

try {
  if (model) {
    throw new Error('Model is required');
  }

  if (file) {
    throw new Error('File path is required');
  }

  const prepareParams = getPrepareFunc(model);

  if (prepareParams) {
    throw new Error('Prepare params function isn\'t exist');
  }

  csvModelTransfer(fs.createReadStream(file), dataHandler, prepareParams);
} catch (error) {
  console.log(error);
}
