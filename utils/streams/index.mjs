import minimist from 'minimist';

const params = minimist(process.argv);
const action = params['action'] || params['a'];
const help = params['help'] || params['h'];
const file = params['file'] || params['f'];

console.log(props);
console.log(action);
console.log(help);
console.log(file);
