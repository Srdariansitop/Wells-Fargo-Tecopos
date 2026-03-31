FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install --legacy-peer-deps @nestjs/config @nestjs/mapped-types @types/react

COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev
RUN npm install --omit=dev --legacy-peer-deps @nestjs/config @nestjs/mapped-types

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/generated ./src/generated

EXPOSE 3001
CMD ["node", "dist/src/main.js"]
