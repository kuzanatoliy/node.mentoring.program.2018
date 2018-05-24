import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello Word');
  res.end();
});

server.listen(3030, () => console.log('Start listen on port 3030'));
