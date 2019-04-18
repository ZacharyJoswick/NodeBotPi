# FROM arm32v7/node
FROM resin/rpi-raspbian:jessie

RUN mkdir -p /NodeBotPi

WORKDIR /NodeBotPi

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "NodeBotPi.js" ]