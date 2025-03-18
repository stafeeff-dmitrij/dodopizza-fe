FROM node:20-alpine
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY .env.template .env
COPY . ./
CMD ["npm", "run", "build"]