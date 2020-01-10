import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

export default ({ env, isDev }) => {
  if (env.SENTRY_DSN && !isDev) {
    Sentry.init({
      dsn: env.SENTRY_DSN,
      integrations: [new Integrations.Vue({Vue, attachProps: true})],
      release: env.RELEASE_NAME,
    });
  }
};
