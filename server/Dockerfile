FROM node:15-slim
RUN apt-get update
WORKDIR /app
COPY package*.json ./
RUN npm i --quiet
COPY . .
EXPOSE 5000
CMD ["npm", "start"]