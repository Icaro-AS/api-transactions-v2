
FROM node:23.11-alpine


WORKDIR /app


COPY package.json yarn.lock ./


RUN yarn install 

COPY . .

RUN yarn build


EXPOSE 3000


CMD ["node", "dist/main"]
