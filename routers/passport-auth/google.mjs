import passport from 'passport';
import GoogleOAuthStrategy from 'passport-google-oauth20';
import { signJWT } from '../../utils/jwt';
import { getUserOrCreate } from '../../controllers/user';

import AUTH_CONFIGS from '../../configs/auth';
const { NAME, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, SCOPE } = AUTH_CONFIGS.GOOGLE_OAUTH_CONFIG;
const { SUCCESS_URI, FAILED_URI } = AUTH_CONFIGS.REDIRECTS;

export const options = {
  failureRedirect: FAILED_URI,
  successRedirect: SUCCESS_URI,
  session: false,
};

export const googleParamsTransfer = params => ({
  outputId: params.id,
  email: params.emails[0].value,
  firstName: params.name.givenName,
  lastName: params.name.familyName,
  provider: params.provider,
});

passport.use(new GoogleOAuthStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: CALLBACK_URL,
  scope: SCOPE,
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, cb) => {
  try {
    const user = await getUserOrCreate(googleParamsTransfer(profile));
    req.session.userInfo = user;
    req.session.token = signJWT(user);
    cb(null, user);
  } catch (error) {
    cb(error);
  }
}));

export function setGoogleAuth(router) {
  router.route('/auth/login/google')
    .get(passport.authenticate(NAME, options));

  router.route('/auth/login/google/callback')
    .get(passport.authenticate(NAME, options));
}
