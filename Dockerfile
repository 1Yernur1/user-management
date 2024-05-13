

FROM node:20.10.0-alpine

WORKDIR /app

COPY ./package.json .

RUN npm install
RUN npm install -g json-server

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
