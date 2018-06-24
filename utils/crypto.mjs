import crypto from 'crypto';

export const ALGORITHM = 'aes192';
export const SECRET = 'NodeJS mentoring programm';
export const IV = null;
export const INPUT_ENCODING = 'utf8';
export const OUTPUT_ENCODING = 'hex';

export const encoding = str => {
  const cipher = crypto.createCipher(ALGORITHM, SECRET, IV);
  return cipher.update(str, INPUT_ENCODING, OUTPUT_ENCODING) + cipher.final(OUTPUT_ENCODING);
};

export const decoding = str => {
  const decipher = crypto.createDecipher(ALGORITHM, SECRET, IV);
  return decipher.update(str, OUTPUT_ENCODING, INPUT_ENCODING) + decipher.final(INPUT_ENCODING);
};
