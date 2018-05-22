import { COMMANDS, SHORT_COMMANDS, MESSAGES } from './constants';

const temp = {};

Object.keys(COMMANDS).forEach(item => {
  temp[COMMANDS[item]] = MESSAGES[item];
  temp[SHORT_COMMANDS[item]] = `It's short from command ${ MESSAGES[item] }.`;
});

export const HELP = Object.freeze(temp);

const helpItemHandler = item => HELP[item] ? `${ item }: ${ HELP[item] }\r\n` : `${ item }: Not found\r\n`;

export const helpShow = items => {
  if (items) {
    if (items.map) {
      return items.map(helpItemHandler).join('');
    } else {
      return helpItemHandler(items);
    }
  } else {
    return Object.keys(HELP).map(helpItemHandler).join('');
  }
};
