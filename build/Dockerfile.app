FROM node:14.4.0

EXPOSE 8888

WORKDIR /app

COPY ./server/package.json ./

RUN ["npm", "install"]

COPY ./server/. .

CMD ["npm", "start"]
