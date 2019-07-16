FROM node:8.10.0
MAINTAINER Bharath
RUN mkdir /app
WORKDIR /app
ADD . /app
RUN npm install
ENTRYPOINT npm run start
EXPOSE 3000
