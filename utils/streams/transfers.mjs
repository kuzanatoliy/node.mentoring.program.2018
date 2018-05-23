import through2 from 'through2';
import * as models from '../../models';

export const strTransfer = (inStream, outStream, callback) => {
  inStream.pipe(through2(function (chunk, end) {
    this.push(callback(chunk));
    inStream.end();
  })).pipe(process.stdout);
};

export const simpleTransfer = (inStream, outStream) => {
  inStream.pipe(outStream);
};

export const csvToJsonTransfer = (inStream, outStream) => {
  const data = [];
  inStream.on('data', chunk => {
    data.push(chunk.toString());
  }).on('end', () => {
    const lines = data.join('').split('\r\n');
    const Model = models[lines[0]];
    const result = [];
    for (let i = 1; i < lines.length; i++) {
      result.push(Model.createCSV(lines[i]).toJSON());
    }
    outStream.write(JSON.stringify(result));
  });
};
