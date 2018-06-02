import http from 'http';
import app from './app';

import appConfig from './config/app';

const server = http.createServer(app);

server.listen(appConfig.port, () => {
  const { name, port } = appConfig;
  console.log(`App ${ name } was started on port: ${ port }`);
});
