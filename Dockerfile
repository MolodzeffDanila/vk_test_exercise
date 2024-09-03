FROM ubuntu:22.04 AS build
LABEL authors="Danila"

RUN apt-get update && apt-get install curl
RUN curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
RUN exec bash
RUN nvm install 18

WORKDIR /app
COPY package*.json .

RUN npm install

COPY /src .
COPY /public .

RUN npm run build

FROM nginx:1.21.0-alpine

COPY --from=build /app/build /var/www/build