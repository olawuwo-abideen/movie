FROM node

WORKDIR /app/movies-service

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "start"]