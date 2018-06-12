import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const middlewares = [
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  cookieParser('Node js mentoring programm'),
];

export default (app) => {
  middlewares.forEach(middleware => app.use(middleware));
};
