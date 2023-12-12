FROM node

WORKDIR /app/notification-service

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3006

CMD ["npm", "start"]