FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Generamos el cliente de Prisma antes de buildear (Si usas Prisma)
# RUN npx prisma generate 

RUN ./node_modules/.bin/nest build sso-service

CMD ["node", "dist/apps/sso-service/main"]