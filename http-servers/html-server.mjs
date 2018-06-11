import http from 'http';
import fs from 'fs';
import { messageTransfer } from '../utils/transfers';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'html' });
  messageTransfer(fs.createReadStream('./http-servers/index.html'), res, { message: 'Hello world' });
});

server.listen(3010, () => console.log('Start listen on port 3010'));
