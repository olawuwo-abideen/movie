FROM node

WORKDIR /app/customer-service

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]