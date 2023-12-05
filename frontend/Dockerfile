FROM node:alpine

RUN npm install -g pm2

WORKDIR /usr/app

COPY ./package.json /usr/app
RUN npm install

# DELETE node_modules before running this file!!!
COPY ./ ./
RUN npm run build

# run the docker specific npm script
CMD ["npm", "run", "docker-start"]
