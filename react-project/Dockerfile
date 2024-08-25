FROM node:20

WORKDIR /app

COPY . .

RUN cp /app/.env.example /app/.env

RUN npm install

CMD [ "npm", "start" ]
