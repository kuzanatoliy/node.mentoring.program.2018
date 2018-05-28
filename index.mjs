import http from 'http';
import express from 'express';

import registerMiddlewares from './middlewares';
import appConfig from './config/app';
import { setApi } from './routers';

const app = express();
const router = express.Router();

registerMiddlewares(app);
setApi(router);
app.use(router);

app.get('/*', (req, res) => {
  res.send('Page not found');
});

const server = http.createServer(app);

server.listen(appConfig.port, () => {
  const { name, port } = appConfig;
  console.log(`App ${ name } was started on port: ${ port }`);
});
