import express from 'express';

import registerMiddlewares from './middlewares';
import { setApi } from './routers';

import ERRORS from './constants/errors';

const { NOT_FOUND } = ERRORS;

const app = express();
const router = express.Router();

registerMiddlewares(app);
setApi(router);
app.use('/api', router);

app.get('/*', (req, res) => {
  const { code, message } = NOT_FOUND;
  res.status(code).end(message);
});

export default app;
