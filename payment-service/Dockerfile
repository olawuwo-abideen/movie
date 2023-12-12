FROM node

WORKDIR /app/payment-service

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3005

CMD ["npm", "start"]