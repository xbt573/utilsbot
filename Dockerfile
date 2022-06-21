FROM node:lts-alpine

WORKDIR /usr/src/app
COPY . .

RUN yarn

ENTRYPOINT ["/bin/sh", "-c"]
