import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';

const middlewares = [
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  cookieParser('Node js mentoring programm'),
  // refactored
  session({
    secret: 'Node js mentoring program secret',
    resave: true,
    saveUninitialized: true,
  }),
  passport.initialize(),
  passport.session(),
];

export default (app) => {
  middlewares.forEach(middleware => app.use(middleware));
};
