const passport = require('../services/passport');
const AuthConfig = require('../config/auth.json');

const { get } = require('lodash');

const GoogleAuthController = passport.authenticate('google', {
  scope: AuthConfig.google.scopes,
});

const GooglePassportController = passport.authenticate('google', { failureRedirect: '/login' });

const GoogleAuthRedirectController = async (ctx) => {
  const user = get(ctx, 'state.session.passport.user');
  
  
  if (ctx.isAuthenticated() && user) {
    ctx.redirect(`/login?token=${user.token}`);
    return;
  }

  ctx.redirect('/login');
};

module.exports = {
  GoogleAuthController,
  GooglePassportController,
  GoogleAuthRedirectController,
};
