FROM node:12.13.1
RUN mkdir /server
WORKDIR /server
ADD package*.json ./
RUN npm ci 
RUN mkdir ./server
COPY server ./server
RUN npm install
RUN npm rebuild bcrypt --build-from-source
EXPOSE 8080
CMD ["npm", "run", "start:dev"]