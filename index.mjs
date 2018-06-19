import http from 'http';
import app from './app';

import APP_CONFIGS from './configs/app';

const { NAME, PORT } = APP_CONFIGS;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App ${ NAME } was started on port: ${ PORT }`);
});
