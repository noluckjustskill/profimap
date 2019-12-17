import { get } from 'lodash';
import { parseCookieString } from '../utils/string';

export default ({ $axios, app}) => {
  $axios.onResponse(response => {
    const cookies = get(response.headers, 'set-cookie', []);
    const guestTokenCookie = cookies.find(c => /newToken/.test(c));

    if (guestTokenCookie && !app.$auth.loggedIn) {
      const guestToken = parseCookieString(guestTokenCookie, 'newToken');
      app.$auth
        .setUserToken(guestToken)
        .catch((err) => console.error(`Error when accept invation token: ${JSON.stringify(err)}`));
    }
  });
};
