FROM node:16-slim
WORKDIR /usr/app
COPY package.json .
RUN npm i --quiet
EXPOSE 3000
COPY . .
CMD ["npm", "start"]