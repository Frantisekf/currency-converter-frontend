FROM node:16-alpine

WORKDIR /app

COPY package.json .

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

COPY . .

RUN npm i

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 5173

CMD ["npm", "run", "dev"]