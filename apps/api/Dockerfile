FROM node:lts-alpine

RUN npm i -g @nrwl/cli

RUN mkdir /home/node/code
WORKDIR /home/node/code

COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY . .

CMD nx serve api
