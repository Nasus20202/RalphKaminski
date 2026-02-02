FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache ffmpeg

COPY *.json ./

RUN npm ci

COPY src ./src

CMD ["npm", "start"]

