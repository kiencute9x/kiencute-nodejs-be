# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
RUN yarn install --production
CMD ["node", "./app.js"]
EXPOSE 3000
