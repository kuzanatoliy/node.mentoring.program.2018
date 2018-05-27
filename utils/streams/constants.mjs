export const PARAMS_INDEXES = Object.freeze({
  FIRST: 2,
  SECOND: 4,
});

export const COMMANDS = Object.freeze({
  ACTION: 'action',
  HELP: 'help',
  FILE: 'file',
  PATH: 'path'
});

export const SHORT_COMMANDS = Object.freeze({
  ACTION: 'a',
  HELP: 'h',
  FILE: 'f',
  PATH: 'p',
});

const alias = {};
const defaultVal = {};
Object.keys(COMMANDS).forEach(item => alias[COMMANDS[item]] = SHORT_COMMANDS[item]);
Object.keys(COMMANDS).forEach(item => defaultVal[COMMANDS[item]] = false);

export const OPTIONS = Object.freeze({ alias, default: defaultVal });

export const EPAM_CSS_FILE = 'https://drive.google.com/uc?authuser=0&id=1tCm9Xb4mok4Egy2WjGqdYYkrGia0eh7X&export=download';

export const MESSAGES = Object.freeze({
  ACTION: 'Set command for performance. Example --action=smth. Can use in short form. Example -a smth',
  HELP: 'View help instructions. Example --help. Can use in short form. Example -h smth',
  FILE: 'Set path for file. Example --action=smth --file=smth. Can use in short form. Example -f smth',
  PATH: 'Set path for dir. Example --action=smth --path=smth. Can use in short form. Example -f smth',
});
