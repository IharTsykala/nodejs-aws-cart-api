# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Create the final image
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

#ENV PG_HOST=$PG_HOST
#ENV PG_PORT=$PG_PORT
#ENV PG_USER=$PG_USER
#ENV PG_PASSWORD=$PG_PASSWORD
#ENV PG_DATABASE=$PG_DATABASE
#ENV VPS_ID=$VPS_ID
#ENV AWS_ACCOUNT=$AWS_ACCOUNT
#ENV REGION=$REGION
#ENV PORT=$PORT

EXPOSE 4000

CMD ["node", "dist/main.js"]
