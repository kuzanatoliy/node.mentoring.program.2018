import passport from 'passport';
import GoogleOAuthStrategy from 'passport-google-oauth20';

import AUTH_CONFIGS from '../../configs/auth';
const { NAME, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, SCOPE } = AUTH_CONFIGS.GOOGLE_OAUTH_CONFIG;
const { SUCCESS_URI, FAILED_URI } = AUTH_CONFIGS.REDIRECTS;

export const options = {
  failureRedirect: FAILED_URI,
  successRedirect: SUCCESS_URI,
  sesion: false,
};

passport.use(new GoogleOAuthStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: CALLBACK_URL,
  scope: SCOPE,
}, (accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  cb(null, profile);
}));

export function setGoogleAuth(router) {
  router.route('/auth/login/google')
    .get(passport.authenticate(NAME, options));

  router.route('/auth/login/google/callback')
    .get(passport.authenticate(NAME, options));
}
