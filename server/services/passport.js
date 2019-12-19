const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const VkontakteStrategy = require('passport-vkontakte').Strategy;
const { get } = require('lodash');

const { findOAuthUser, createOAuthUser, authUser } = require('../services/user');

passport.serializeUser(({
  id,
  name,
  email,
  picture,
}, done) => {
  const externalId = String(id);
  
  return findOAuthUser(externalId, email).then(user => {
    if (!user) {
      return createOAuthUser(externalId, name, email, picture);
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
}, (accessToken, refreshToken, profile, done) => {
  const { id, name, picture, email } = get(profile, '_json', {});
  if (!email) {
    done(true, null);
  }

  done(null, {
    id,
    name,
    email,
    picture,
  });
}));

passport.use(new VkontakteStrategy({
  clientID: process.env.VKONTAKTE_CLIENT_ID,
  clientSecret: process.env.VKONTAKTE_CLIENT_SECRET,
  callbackURL: '/auth/vkontakte-redirect',
}, (accessToken, refreshToken, profile, done) => {
  const { id, displayName } = profile;
  if (!id) {
    done(true, null);
  }

  done(null, {
    id,
    name: displayName,
  });
}));

module.exports = passport;
