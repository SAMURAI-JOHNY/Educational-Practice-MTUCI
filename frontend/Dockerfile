FROM node:13.12.0-alpine

WORKDIR /frontend

EXPOSE 3000

COPY ./ ./
RUN npm install --legacy-peer-deps

CMD ["npm", "start"]