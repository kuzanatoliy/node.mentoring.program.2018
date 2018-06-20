import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import GoogleOAuthStrategy from 'passport-google-oauth20';
import { sendJsonData } from '../utils/response';
import { signJWT } from '../utils/jwt';
// import OAUTH_CONFIGS from '../configs/oauth';

// const { TWITTER_OAUTH_CONFIG } = OAUTH_CONFIGS;

// passport.use(new TwitterStrategy(TWITTER_OAUTH_CONFIG, (token, tokenSecret, profile, cb) => {
//   return cb(null, profile);
// }));

passport.use(new GoogleOAuthStrategy({
  clientID: '782564964019-q4dehbr1vd673s1docfderu811r83i6u.apps.googleusercontent.com',
  clientSecret: 'TPAGM9nBaqr-R2hQ8otxI2NG',
  callbackURL: "http://localhost:3000/api/auth/login/google/callback",
}, (accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  cb(null, profile);
}));

export function setAuthApi(router) {
  router.route('/auth/login')
    .get(loginTreatment);

  router.route('/auth/login/google')
    .get(passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));

  router.route('/auth/login/google/callback')
    .get(passport.authenticate('google', { session: false, scope: ['profile', 'email'] }), twitterCallbackTreatment);

  /* router.route('/auth/login/twitter')
    .get(passport.authenticate('twitter', { session: false }));

  router.route('/auth/login/twitter/callback')
    .get(passport.authenticate('twitter', { session: false }), twitterCallbackTreatment); */
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
