FROM node:16-slim
WORKDIR /usr/app
COPY package.json .
RUN npm i --quiet
COPY . .
EXPOSE 5000
CMD ["npm", "start"]