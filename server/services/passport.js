const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { get } = require('lodash');

const { findOAtuhUser, createOAuthUser, AuthUser } = require('../services/user');

passport.serializeUser((userData, done) => {
  const { name, picture, email } = get(userData, '_json', {});

  if (!email) {
    done(true, null);
  }

  findOAtuhUser(userData.id).then(user => {
    if (!user) {
      return createOAuthUser(userData.id, name, email, picture);
    }

    return user;
  }).then(profile => {
    return AuthUser(profile.id);
  }).then(token => {
    done(null, { token });
  }).catch(err => {
    done(err, null);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google-redirect',
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

module.exports = passport;
