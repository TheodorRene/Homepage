FROM node:12.2.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .

RUN npm install

COPY . .

CMD node app.js dev
