const passport = require('../services/passport');

const { get } = require('lodash');

const VkontakteAuthController = passport.authenticate('vkontakte', {
  display: 'page',
  scope: ['email'],
});

const VkontaktePassportController = passport.authenticate('vkontakte', { failureRedirect: '/login' });

const VkontakteAuthRedirectController = async (ctx) => {
  const user = get(ctx, 'state.session.passport.user');

  if (ctx.isAuthenticated() && user) {
    ctx.redirect(`/login?token=${user.token}`);
    return;
  }

  ctx.redirect('/login');
};

module.exports = {
  VkontakteAuthController,
  VkontaktePassportController,
  VkontakteAuthRedirectController,
};
