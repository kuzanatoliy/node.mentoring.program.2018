import http from 'http';

const server = http.createServer((req, res) => {
  req.pipe(res);
});

server.listen(3010, () => console.log('Start listen on port 3040'));
