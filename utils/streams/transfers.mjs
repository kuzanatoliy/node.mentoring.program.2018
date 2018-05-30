import map from 'through2-map';
import through2 from 'through2';
import CombinedStream from 'combined-stream';
import split from 'split';
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
  let model;
  let started = false;
  inStream
    .on('error', errorHandler)
    .pipe(split())
    .pipe(through2(function (chunk, end, next) {
      if (model) {
        if (started) {
          this.push(',');
        } else {
          this.push('[');
          started = true;
        }
        this.push(JSON.stringify(model.createCSV(chunk.toString()).toJSON()));
      } else {
        model = models[chunk];
      }
      next();
    }))
    .on('end', () => {
      outStream.write(']');
    })
    .pipe(outStream);
};

export const combinedTransfer = (inStreams, outStream, errorHandler = defaultErrorHandler) => {
  const combinedStream = CombinedStream.create({ pauseStreams: false });
  inStreams.forEach(stream => combinedStream.append(stream));
  combinedStream.on('error', errorHandler).pipe(outStream);
};
