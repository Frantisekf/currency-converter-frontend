FROM node:16-alpine

WORKDIR /app

COPY package.json .

COPY . .

RUN npm ci

EXPOSE 5173

CMD ["npm", "run", "dev"]