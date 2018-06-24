import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import { signJWT } from '../../utils/jwt';

import AUTH_CONFIGS from '../../configs/auth';
const { NAME, CONSUMER_KEY, CONSUMER_SECRET, CALLBACK_URL } = AUTH_CONFIGS.TWITTER_OAUTH_CONFIG;
const { SUCCESS_URI, FAILED_URI } = AUTH_CONFIGS.REDIRECTS;

export const options = {
  failureRedirect: FAILED_URI,
  successRedirect: SUCCESS_URI,
  session: false,
};

export const twitterParamsTransfer = params => {
  const [lastName, firstName] = params.displayName.split(' ');
  return {
    outputId: params.id,
    login: params.screen_name,
    email: null,
    firstName,
    lastName,
    provider: params.provider,
  };
};

passport.use(new TwitterStrategy({
  consumerKey: CONSUMER_KEY,
  consumerSecret: CONSUMER_SECRET,
  callbackUrl: CALLBACK_URL,
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, cb) => {
  const user = twitterParamsTransfer(profile);
  req.session.token = signJWT(user);
  cb(null, profile);
}));

export function setTwitterAuth(router) {
  router.route('/auth/login/twitter')
    .get(passport.authenticate(NAME, options));

  router.route('/auth/login/twitter/callback')
    .get(passport.authenticate(NAME, options));
}
