# Import nodejs version 16.x

FROM node:16

ENV NODE_ENV production

# Install packages

WORKDIR /usr/igetickets
COPY package.json .
RUN npm install

# Build the project from typescript to javascript
COPY . .
RUN npm run build
CMD ["npm", "start"]