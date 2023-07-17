FROM node:18-alpine3.17

WORKDIR /aws_nodejs_cart_api

COPY package.json package-lock.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 4000

ENTRYPOINT [ "node", "dist/src/main.js" ]

