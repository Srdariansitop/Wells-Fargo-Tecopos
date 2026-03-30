FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Copiamos archivos de dependencias de la raíz
COPY package*.json ./
RUN npm install

# Copiamos todo el código del monorepo
COPY . .

# Compilamos específicamente el gateway
RUN ./node_modules/.bin/nest build api-gateway

# Comando de ejecución apuntando al build del gateway
CMD ["node", "dist/apps/api-gateway/main"]