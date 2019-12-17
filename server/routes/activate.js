const { UsersModel, InvitedUsersModel } = require('../database');
const { get } = require('lodash');
const { authUser } = require('../services/user');

const ActivateController = async (ctx) => {
  const code = get(ctx, 'request.query.code');
  if (!code) {
    ctx.redirect('/login');
    return;
  }
  const invitedUser = await InvitedUsersModel.query().findOne({ code });
  if (!invitedUser) {
    ctx.redirect('/login');
    return;
  }

  const user = await UsersModel.query().findById(invitedUser.userId);
  await user.$query().patch({ status: 'active' });
  await invitedUser.$query().delete();

  const token = await authUser(user.toJSON());

  ctx.redirect(`/login?token=${token}`);
};

module.exports = {
  ActivateController,
};
