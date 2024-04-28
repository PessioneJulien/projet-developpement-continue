FROM node:20
WORKDIR /react-app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
EXPOSE 3000

CMD [ "npm", "start"]