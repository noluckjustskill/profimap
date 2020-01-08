const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const VkontakteStrategy = require('passport-vkontakte').Strategy;
const { get } = require('lodash');

const { findOAuthUser, createOAuthUser, updateOAuthUser, authUser } = require('../services/user');

passport.serializeUser(({
  id,
  name,
  email,
  picture,
  oldToken,
}, done) => {
  const externalId = String(id);
  
  return findOAuthUser(externalId, email).then(user => {
    if (!user) {
      if (oldToken) {
        return updateOAuthUser(oldToken, externalId, name, email, picture);
      } else {
        return createOAuthUser(externalId, name, email, picture);
      }
    }

    return user;
  }).then(profile => {
    return authUser(profile.toJSON());
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
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  const { sub: id, name, picture, email } = get(profile, '_json', {});
  if (!email) {
    done(true, null);
  }
  
  const oldToken = req.cookies.get('auth.local');

  done(null, {
    id,
    name,
    email,
    picture,
    oldToken,
  });
}));

passport.use(new VkontakteStrategy({
  clientID: process.env.VKONTAKTE_CLIENT_ID,
  clientSecret: process.env.VKONTAKTE_CLIENT_SECRET,
  callbackURL: '/auth/vkontakte-redirect',
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  const { id, displayName } = profile;
  if (!id) {
    done(true, null);
  }

  const oldToken = req.cookies.get('auth.local');

  done(null, {
    id,
    name: displayName,
    oldToken,
  });
}));

module.exports = passport;
