import Vue from 'vue';
import { VueReCaptcha } from 'vue-recaptcha-v3';

export default ({ env }) => {
  if (env.RECAPTCHA_SITE_KEY) {
    Vue.use(VueReCaptcha, {
      siteKey: env.RECAPTCHA_SITE_KEY,
      loaderOptions: {
        autoHideBadge: true,
      },
    });
  }
};
