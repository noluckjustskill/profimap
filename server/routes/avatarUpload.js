const fs = require('fs');
const path = require('path');
const { BadRequestError } = require('http-custom-errors');
const { generate } = require('../utils/string');

const AvatarUploadController = async (ctx) => {
  const avatar = ctx.request.files.avatar;
  if (!avatar) {
    throw new BadRequestError('No file in request');
  }

  const ext = avatar.name.split('.').pop();
  if (!ext || !['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
    throw new BadRequestError('Bad file extension');
  }

  const avatarName = `avatar_${ctx.user.id}-${generate(5)}.${ext}`;
  const avatarUrl = `${process.env.BROWSER_BASE_URL}${process.env.STATIC_URL}/${avatarName}`;

  const reader = fs.createReadStream(avatar.path);
  const stream = fs.createWriteStream(path.resolve(`${process.env.STATIC_DIR}/${avatarName}`));
  reader.pipe(stream);

  ctx.body = { avatarUrl };
};

const AvatarUploadRoute = '/avatarUpload';

module.exports = {
  AvatarUploadController,
  AvatarUploadRoute
};
