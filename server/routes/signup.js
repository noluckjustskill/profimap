const { get } = require('lodash');
const { BadRequestError, ConflictError } = require('http-custom-errors');
const { checkUserByEmail, inviteUser } = require('../services/user');
const { badParams, emailIsExists } = require('../config/email.json');
const { checkRecaptchaToken } = require('../services/googleCaptcha');

const SignupController = async (ctx) => {
  try {
    if (get(ctx, 'request.body.test', null) === 'test') { // Tilda test query
      ctx.body = { message: 'OK' };
      return;
    }

    const { name, email, gender, dateOfBirth, recaptchaToken } = get(ctx, 'request.body', {});
    if (!name || !email || !recaptchaToken) {
      throw new BadRequestError(badParams);
    }

    if (await checkUserByEmail(email)) {
      throw new ConflictError(emailIsExists);
    }

    if (!(await checkRecaptchaToken(recaptchaToken))) {
      throw new BadRequestError('reCaptcha error');
    }

    await inviteUser({ name, email, gender, dateOfBirth });

    ctx.body = { message: 'OK' };
  } catch (err) {
    ctx.status = err.code || 500;
    ctx.body = { error: err.message };  
  }
};
  
module.exports = {
  SignupController,
};
