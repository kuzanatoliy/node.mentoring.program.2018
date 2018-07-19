import express from 'express';

import { appMiddleware } from './middlewares';
import { setApi, setAuth } from './routers';
import setDoc from './swagger-doc';

import AUTH_CONFIGS from './configs/auth';

import ERRORS from './constants/errors';

const { NOT_FOUND } = ERRORS;
const { SUCCESS_URI, FAILED_URI } = AUTH_CONFIGS.REDIRECTS;

const app = express();
const apiRouter = express.Router();
const authRouter = express.Router();
const docRouter = express.Router();

appMiddleware(app);
setApi(apiRouter);
setAuth(authRouter);
setDoc(docRouter);
app.use('/api', apiRouter);
app.use(authRouter);
app.use(docRouter);

app.all(SUCCESS_URI, (req, res) => {
  res.end('authorized');
});

app.all(FAILED_URI, (req, res) => {
  res.end('unauthorized');
});

app.get('/*', (req, res) => {
  const { code, message } = NOT_FOUND;
  res.status(code).end(message);
});

export default app;
