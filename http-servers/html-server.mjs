import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'html' });
  const html = fs.readFileSync('./http-servers/index.html')
    .toString()
    .replace('{message}', 'Hello world');
  res.end(html);
});

server.listen(3010, () => console.log('Start listen on port 3010'));
