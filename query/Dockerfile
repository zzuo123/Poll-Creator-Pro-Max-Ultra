FROM node:alpine

RUN npm install -g pm2

WORKDIR /usr/app

COPY ./package.json ./
RUN npm install

# Delete node_modules before building image
COPY ./ ./

CMD ["npm", "run", "docker-start"]

