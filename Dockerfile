FROM node
WORKDIR /index
COPY  package.json .
RUN npm install
COPY . ./
EXPOSE 8082
CMD [ "npm", "start" ]