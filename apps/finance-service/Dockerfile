FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install @nestjs/config @nestjs/axios class-validator class-transformer

COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev
RUN npm install --omit=dev @nestjs/config @nestjs/axios class-validator class-transformer

COPY --from=builder /app/dist ./dist

EXPOSE 3002
CMD ["node", "dist/main"]
