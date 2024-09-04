FROM node:18.13.0-alpine AS build
LABEL authors="Danila"

WORKDIR /app
COPY package*.json .

RUN npm install

COPY /src .
COPY /public .

RUN npm run build

FROM nginx:1.21.0-alpine

COPY --from=build /app/build /var/www/build