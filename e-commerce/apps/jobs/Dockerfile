FROM node:alpine as development

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

COPY apps/jobs apps/jobs
COPY libs libs
COPY nest-cli.json nest-cli.json

RUN pnpm install -r

# Set CI environment variable to true for non-interactive installs
ENV CI=true

RUN pnpm install -r --no-frozen-lockfile

RUN pnpm run build jobs

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app


COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/jobs/main.js"]