# Stage 1: Build the application
FROM node:alpine3.20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine3.20

WORKDIR /app

COPY --from=builder /app /app

ENV PG_HOST=localhost
ENV PG_PORT=5432
ENV PG_USER=postgres
ENV PG_PASSWORD=postgres
ENV PG_DATABASE=example

RUN echo "PG_HOST=${PG_HOST}" > .env && \
    echo "PG_PORT=${PG_PORT}" >> .env && \
    echo "PG_USER=${PG_USER}" >> .env && \
    echo "PG_PASSWORD=${PG_PASSWORD}" >> .env && \
    echo "PG_DATABASE=${PG_DATABASE}" >> .env

EXPOSE 3000

CMD ["npm", "run", "start"]
