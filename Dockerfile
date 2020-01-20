FROM node:10.10.0-slim as builder

ENV NODE_PATH=src

WORKDIR /var/app

ARG ENV_NAME

COPY package.json /var/app/package.json
COPY package-lock.json /var/app/package-lock.json

RUN NODE_ENV=development npm install

COPY public/ /var/app/public
COPY src/ /var/app/src
COPY server/ /var/app/server
COPY *.env /var/app/
COPY *.env.${ENV_NAME} /var/app/

RUN npm install dotenv-cli -g

RUN NODE_ENV=production \
  && dotenv -e .env.${ENV_NAME} npm run build

FROM node:10.10.0-slim

ENV NODE_ENV=production

WORKDIR /var/app

COPY package.json /var/app/package.json
COPY package-lock.json /var/app/package-lock.json

RUN NODE_ENV=production npm ci

EXPOSE 3000
COPY --from=builder /var/app/build/ /var/app/build
COPY --from=builder /var/app/server/index.js /var/app/server/index.js

CMD ["npm", "run", "prod"]
