FROM node:alpine

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
ARG base_url
ENV BASE_URL $base_url

RUN npm run build
