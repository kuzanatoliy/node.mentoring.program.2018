import { setGoogleAuth } from './google';
import { setTwitterAuth } from './twitter';
import { setFacebookAuth } from './facebook';
import { setLocalAuth } from './local';

const apiSetters = [ setGoogleAuth, setTwitterAuth, setFacebookAuth ];

export function setAuth(router) {
  apiSetters.forEach(item => item(router));
}
