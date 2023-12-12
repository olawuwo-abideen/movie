FROM node

WORKDIR /app/delivery-service

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3007

CMD ["npm", "start"]