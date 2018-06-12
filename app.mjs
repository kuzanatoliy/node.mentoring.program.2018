import express from 'express';

import registerMiddlewares from './middlewares';
import { setApi } from './routers';

const app = express();
const router = express.Router();

registerMiddlewares(app);
setApi(router);
app.use('/api', router);

app.get('/*', (req, res) => {
  res.send('Page not found');
});

export default app;
