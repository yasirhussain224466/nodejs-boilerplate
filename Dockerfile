FROM node:latest

WORKDIR /app

ENV AWS_REGION=us-west-1
ENV AWS_SECRET=staging-backend

COPY ./package.json .

RUN npm install

RUN npm install aws-sdk

COPY . .

EXPOSE 8081

CMD ["sh", "-c", "node secrets.js && npm start"]

