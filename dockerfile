FROM node:alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/

## ENVIRONMENTS: homolog, prod. Uncomment the line below to deploy
## ENV NODE_ENV=homolog

RUN npm install
COPY . /usr/src/app
EXPOSE 3000
CMD [ "npm", "start" ]