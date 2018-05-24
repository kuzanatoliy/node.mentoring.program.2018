import http from 'http';

const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [
    { color: 'blue' },
    { size: 'XL' },
  ],
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'json' });
  res.write(JSON.stringify(product));
  res.end();
});

server.listen(3020, () => console.log('Start listen on port 3020'));
