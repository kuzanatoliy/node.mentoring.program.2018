import passport from 'passport';
import FacebookOAuthStrategy from 'passport-facebook';
import { signJWT } from '../../utils/jwt';
import { convertToJSON } from '../../utils/sequelize';
import { userController } from '../../controllers';

import AUTH_CONFIGS from '../../configs/auth';
const { NAME, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, PROFILE_FIELDS, SCOPE } = AUTH_CONFIGS.FACEBOOK_OAUTH_CONFIG;
const { SUCCESS_URI, FAILED_URI } = AUTH_CONFIGS.REDIRECTS;

const { getUserOrCreate } = userController;

export const options = {
  failureRedirect: FAILED_URI,
  successRedirect: SUCCESS_URI,
  session: false,
};

export const facebookParamsTransfer = params => ({
  outputId: params.id,
  email: null,
  firstName: params.name.givenName,
  lastName: params.name.familyName,
  provider: params.provider,
});

passport.use(new FacebookOAuthStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: CALLBACK_URL,
  scope: SCOPE,
  profileFields: PROFILE_FIELDS,
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, cb) => {
  try {
    const user = convertToJSON((await getUserOrCreate(facebookParamsTransfer(profile)))[0]);
    req.session.userInfo = user;
    req.session.token = signJWT(user);
    cb(null, user);
  } catch (error) {
    cb(error);
  }
}));

export function setFacebookAuth(router) {
  router.route('/auth/login/facebook')
    .get(passport.authenticate(NAME, options));

  router.route('/auth/login/facebook/callback')
    .get(passport.authenticate(NAME, options));
}
