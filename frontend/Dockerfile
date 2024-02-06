FROM node:21-alpine

WORKDIR /code

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --silent

COPY . .

CMD ["npm", "run", "dev"]