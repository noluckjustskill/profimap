const axios = require('axios');

const checkRecaptchaToken = async (recaptchaToken) => {
  return await axios({
    method: 'post',
    url: 'https://www.google.com/recaptcha/api/siteverify', 
    params: {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: recaptchaToken,
    }
  }).then(response => {
    return response.data.success;
  }).catch((err) => {
    logger.log('error', `Bad captcha verification: ${JSON.stringify(err)}`);
    return null;
  });
};

module.exports = {
  checkRecaptchaToken
};
