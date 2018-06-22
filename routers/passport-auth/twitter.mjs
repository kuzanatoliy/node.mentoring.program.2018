import passport from 'passport';
import TwitterStrategy from 'passport-twitter';

import AUTH_CONFIGS from '../../configs/auth';
const { NAME, CONSUMER_KEY, CONSUMER_SECRET, CALLBACK_URL } = AUTH_CONFIGS.GOOGLE_OAUTH_CONFIG;
const { SUCCESS_URI, FAILED_URI } = AUTH_CONFIGS.REDIRECTS;

export const options = {
  failureRedirect: FAILED_URI,
  successRedirect: SUCCESS_URI,
  sesion: false,
};

passport.use(new TwitterStrategy({
  consumerKey: CONSUMER_KEY,
  consumerSecret: CONSUMER_SECRET,
  callbackUrl: CALLBACK_URL,
}, (accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  cb(null, profile);
}));

export function setAuthApi(router) {
  router.route('/auth/login/twitter')
    .get(passport.authenticate(NAME, options));

  router.route('/auth/login/twitter/callback')
    .get(passport.authenticate(NAME, options));
}
