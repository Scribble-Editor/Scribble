FROM node:10

WORKDIR /app

# Copy package files
COPY package.json package.json
COPY yarn.lock yarn.lock

# Install yarn
RUN npm i -g yarn
RUN yarn

# Copy project files
COPY . .

# Nuxt dev server
EXPOSE 3000

CMD ["yarn", "docker:prod"]
