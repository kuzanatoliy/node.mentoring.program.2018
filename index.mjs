import https from 'https';
import fs from 'fs';
import app from './app';

import APP_CONFIGS from './configs/app';

const { NAME, PORT } = APP_CONFIGS;

const server = https.createServer({
  key: fs.readFileSync('configs/certs/server.key'),
  cert: fs.readFileSync('configs/certs/server.crt'),
}, app);

server.listen(PORT, () => {
  console.log(`App ${ NAME } was started on port: ${ PORT }`);
});
