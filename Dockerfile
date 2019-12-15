
FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get install --yes bash build-essential python

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci

# Bundle app source
COPY . .

# Exports
EXPOSE 8000
CMD [ "npm", "run", "start" ]
