FROM node:18.13.0-alpine AS build
LABEL authors="Danila"

WORKDIR /app
COPY package*.json .

RUN npm install

COPY /src .
COPY /public .

RUN npm run start