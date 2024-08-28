FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache ffmpeg

COPY *.json ./

RUN npm install

COPY src ./src

CMD ["npm", "start"]

