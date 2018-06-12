import split from 'split';
import through2 from 'through2';

const defaultErrorHandler = err => {
  if (err) {
    console.log(err.message);
  }
};

const MESSAGE_REG = /{([a-z,1-9]*)}/ig;
const MESSAGE_INDEX = 0;
const MESSAGE_NAME_INDEX = 1;

export const messageTransfer = (strIn, strOut, messages, errorHandler = defaultErrorHandler) => {
  strIn.on('error', errorHandler).pipe(split()).pipe(
    through2(function (chunk, end, next) {
      let str = chunk.toString();
      let result;
      while ((result = MESSAGE_REG.exec(str))) {
        const message = messages[result[MESSAGE_NAME_INDEX]];
        if (message) {
          str = str.replace(result[MESSAGE_INDEX], message);
        }
      }
      this.push(str);
      next();
    })
  ).pipe(strOut);
};
