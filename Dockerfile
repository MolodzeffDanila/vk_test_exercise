FROM node:18.13.0-alpine AS build
LABEL authors="Danila"

WORKDIR /app
COPY package*.json .

COPY . .

RUN npm install

RUN ls

RUN npm run start