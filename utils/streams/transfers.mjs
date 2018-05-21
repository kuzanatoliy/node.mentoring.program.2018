import through2 from 'through2';

export const strTransfer = (inStream, outStream, callback) => {
  inStream.pipe(through2(function (chunk, end) {
    this.push(callback(chunk));
    this.push(end);
  })).pipe(process.stdout);
}

export const csvToJsonTransfer = (inStream, outStream) => {
  inStream.pipe(through2(function(chunk, end, callback) {
    const lines = chunk.toString().split('\r\n');
    const Model = models[lines[0]];
    const result = [];
    for (let i = 1; i < lines.length; i++) {
      result.push(Model.createCSV(lines[i]).toJSON());
    }
    this.push(JSON.stringify(result));
    callback();
  })).pipe(outStream);
}
