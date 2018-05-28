import map from 'through2-map';
import CombinedStream from 'combined-stream';
import * as models from '../../models';

const defaultErrorHandler = err => {
  if (err) {
    console.log(err.message);
  }
};

export const strTransfer = (inStream, outStream, callback, errorHandler = defaultErrorHandler) => {
  inStream.pipe(map(callback)).pipe(outStream).on('error', errorHandler);
};

export const simpleTransfer = (inStream, outStream, errorHandler = defaultErrorHandler) => {
  inStream.on('error', errorHandler).pipe(outStream);
};

export const csvToJsonTransfer = (inStream, outStream, errorHandler = defaultErrorHandler) => {
  let buffer = '';
  let model;
  inStream.on('data', chunk => {
    const lines = chunk.toString().split('\r\n');
    const data = [];
    let i = 0;
    let n = lines.length - 1;
    let prefix = ',';
    if (!buffer) {
      model = models[lines[0]];
      prefix = '[';
      i++;
    } else {
      data[i] = buffer + data[i];
    }
    while (i < n) {
      data.push(JSON.stringify(model.createCSV(lines[i]).toJSON()));
      i++;
    };
    outStream.write(prefix + data.join());
    buffer = lines[i];
  }).on('close', () => {
    outStream.write(',' + JSON.stringify(model.createCSV(buffer).toJSON()) + ']');
    console.log('\r\nFile was converted');
  }).on('error', errorHandler);
};

export const combinedTransfer = (inStreams, outStream, errorHandler = defaultErrorHandler) => {
  const combinedStream = CombinedStream.create({ pauseStreams: false });
  inStreams.forEach(stream => combinedStream.append(stream));
  combinedStream.on('error', errorHandler).pipe(outStream);
};
