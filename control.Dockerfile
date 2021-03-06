# NodeBotPi control docker container
# Installes nodejs and the application dependencies

FROM raspbian/jessie

RUN apt-get update && apt-get install -y curl make cmake g++ gcc

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -

RUN  apt-get install -y nodejs

RUN mkdir -p /NodeBotPi

WORKDIR /NodeBotPi

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "NodeBotPi.js" ]