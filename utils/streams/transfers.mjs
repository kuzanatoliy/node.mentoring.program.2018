import map from 'through2-map';
import CombinedStream from 'combined-stream';
import * as models from '../../models';

export const strTransfer = (inStream, outStream, callback) => {
  inStream.pipe(map(callback)).pipe(outStream);
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

export const combinedTransfer = (inStreams, outStream) => {
  const combinedStream = CombinedStream.create({ pauseStreams: false });
  inStreams.forEach(stream => combinedStream.append(stream));
  combinedStream.pipe(process.stdout);
};
