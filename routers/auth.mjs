import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import OAuth2Strategy from 'passport-oauth2';
import { sendJsonData } from '../utils/response';
import { signJWT } from '../utils/jwt';
import OAUTH_CONFIGS from '../configs/oauth';

const { TWITTER_OAUTH_CONFIG } = OAUTH_CONFIGS;

passport.use(new TwitterStrategy(TWITTER_OAUTH_CONFIG, (token, tokenSecret, profile, cb) => {
  return cb(null, profile);
}));

passport.use(new OAuth2Strategy(
  
), (token, tokenSecret, profile, cb) => {

});

export function setAuthApi(router) {
  router.route('/auth/login')
    .get(loginTreatment);

  router.route('/auth/login/twitter')
    .get(passport.authenticate('twitter', { session: false }));

  router.route('/auth/login/twitter/callback')
    .get(passport.authenticate('twitter', { session: false }), twitterCallbackTreatment);
}

export function loginTreatment(req, res) {
  const { email, password } = req.body;
  const token = signJWT({ email, password });
  sendJsonData(res, { token });
}

export function twitterCallbackTreatment(req, res) {
  console.log(req.user.id);
  res.end('finish');
}
