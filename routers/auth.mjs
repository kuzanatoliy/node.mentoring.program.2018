import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import { sendJsonData } from '../utils/response';
import { signJWT } from '../utils/jwt';
import OAUTH_CONFIGS from '../configs/oauth';

const { TWITTER_OAUTH_CONFIG } = OAUTH_CONFIGS;

passport.use(new TwitterStrategy(TWITTER_OAUTH_CONFIG), (token, tokenSecret, profile, cb) => {
  const localToken = signJWT(profile);
  cb(null, { localToken });
});

export function setAuthApi(router) {
  router.route('/auth/login')
    .get(loginTreatment);

  router.route('/auth/login/twitter')
    .get(passport.authenticate('twitter'));

  router.route('/auth/login/twitter/callback')
    .get(passport.authenticate('twitter'), twitterCallbackTreatment);
}

export function loginTreatment(req, res) {
  const { email, password } = req.body;
  const token = signJWT({ email, password });
  sendJsonData(res, { token });
}

export function twitterCallbackTreatment(req, res) {
  console.log(req);
  console.log(req.user);
  res.end('finish');
}
