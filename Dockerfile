FROM node:10-alpine

RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++ \
  && apk del .gyp

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
ARG node_env
ARG base_url
ARG browser_base_url
ARG yandex_metrika
ARG sentry_dsn
ARG recaptcha_site_key

ENV NODE_ENV $node_env
ENV BASE_URL $base_url
ENV BROWSER_BASE_URL $browser_base_url
ENV YANDEX_METRIKA $yandex_metrika 
ENV SENTRY_DSN $sentry_dsn
ENV RECAPTCHA_SITE_KEY $recaptcha_site_key

RUN npm run build
