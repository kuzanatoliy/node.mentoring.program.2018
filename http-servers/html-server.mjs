import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'html' });
  fs.createReadStream(`./http-servers/index.html`).pipe(res);
});

server.listen(3010, () => console.log('Start listen on port 3010'));
