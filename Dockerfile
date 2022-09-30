# pull node
FROM node:latest as base

WORKDIR /usr/src/app

RUN npm i -g npm@8.13.1

COPY package.json ./

RUN npm i --legacy-peer-deps

RUN npm i -g rimraf

# build the nestjs api
FROM base as build

WORKDIR /usr/src/app

COPY . .

RUN npm run build

# create final api image
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

COPY service-account-file.json ./

RUN npm i -g npm@8.13.1

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm install --omit=dev --legacy-peer-deps

COPY --from=build /usr/src/app/dist ./dist

RUN chown node:node -R /usr/src/app/dist

USER node

CMD ["node", "dist/main"]