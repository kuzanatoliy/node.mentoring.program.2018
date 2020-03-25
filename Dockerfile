FROM node:8

WORKDIR /workdir

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run start