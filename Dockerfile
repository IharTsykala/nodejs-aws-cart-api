FROM node:18-alpine3.17 As development

WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./

RUN npm install && npm cache clean --force

COPY --chown=node:node . .

USER node

#########################################

FROM node:18-alpine3.17 As build

WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./

COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

##############################

FROM node:18-alpine3.17 As production

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

CMD [ "node", "dist/main.js" ]

