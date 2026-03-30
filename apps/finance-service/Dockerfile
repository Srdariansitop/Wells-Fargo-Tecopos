FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN ./node_modules/.bin/nest build finance-service

CMD ["node", "dist/apps/finance-service/main"]