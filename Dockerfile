FROM node:0.10

MAINTAINER himcc "172108805@qq.com"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install

EXPOSE 3000

CMD ["node","app.js"]
