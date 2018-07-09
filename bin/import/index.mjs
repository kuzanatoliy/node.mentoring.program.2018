import minimist from 'minimist';
import fs from 'fs';
import models from '../../models';

const { model, file } = minimist(process.argv.slice(2));

try {
  if (!model) {
    throw new Error('Model is required');
  }

  if (!file) {
    throw new Error('File path is required');
  }

  const usedModel = models[model];

  if (!usedModel) {
    throw new Error('Model not found');
  }

  if (file.split('.').pop() !== 'json') {
    throw new Error('File have to be a json format');
  }

  usedModel.create(fs.readFileSync(file));
} catch (error) {
  console.log(error);
}
