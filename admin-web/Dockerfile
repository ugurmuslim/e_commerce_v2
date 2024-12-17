FROM node:alpine as development

WORKDIR /usr/src

RUN npm install -g pnpm

COPY . admin-web

# Set CI environment variable to true for non-interactive installs
ENV CI=true

RUN pnpm install -r --no-frozen-lockfile

