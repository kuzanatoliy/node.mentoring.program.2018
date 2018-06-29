import { setGoogleAuth } from './google';
import { setTwitterAuth } from './twitter';
import { setFacebookAuth } from './facebook';

const apiSetters = [ setGoogleAuth, setTwitterAuth, setFacebookAuth ];

export function setAuth(router) {
  apiSetters.forEach(item => item(router));
}
