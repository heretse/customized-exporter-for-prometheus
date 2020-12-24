FROM node:10

RUN mkdir /opt/customized-exporter

WORKDIR /opt/customized-exporter

COPY . .
 
RUN npm install

CMD npm start