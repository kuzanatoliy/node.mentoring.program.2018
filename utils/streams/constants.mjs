export const PARAMS_INDEXES = Object.freeze({
  PARAMS: 0,
  FIRST: 1,
  SECOND: 2,
});

export const COMMANDS = Object.freeze({
  ACTION: 'action',
  FILE: 'file',
  HELP: 'help',
});

export const SHORT_COMMANDS = Object.freeze({
  ACTION: 'a',
  FILE: 'f',
  HELP: 'h',
});

export const EPAM_CSS_FILE = 'https://drive.google.com/uc?authuser=0&id=1tCm9Xb4mok4Egy2WjGqdYYkrGia0eh7X&export=download';

export const MESSAGES = Object.freeze({
  ACTION: 'Set command for performance. Example --action=smth. Can use in short form. Example -a smth',
  HELP: 'View help instructions. Example --help. Can use in short form. Example -h smth',
  FILE: 'Set path for file. Example --action=smth --file=smth. Can use in short form. Example -f smth',
});
