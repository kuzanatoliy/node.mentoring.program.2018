import passport from 'passport';
import LocalStrategy from 'passport-local';
import { signJWT } from '../../utils/jwt';

import AUTH_CONFIGS from '../../configs/auth';
const { SUCCESS_URI, FAILED_URI } = AUTH_CONFIGS.REDIRECTS;

export const options = {
  failureRedirect: FAILED_URI,
  successRedirect: SUCCESS_URI,
  session: false,
};

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, cb) => {
  req.session.token = signJWT({ email, password });
  cb(null, { email, password });
}));

export function setLocalAuth(router) {
  router.route('/auth/login')
    .post(passport.authenticate('local', options));
}
