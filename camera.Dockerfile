FROM arm32v7/gcc
#FROM resin/rpi-raspbian:jessie

RUN apt-get update && apt-get install -y cmake libjpeg8-turbo-dev g++ git libraspberrypi-bin

RUN git clone https://github.com/jacksonliam/mjpg-streamer.git /streamer

WORKDIR /streamer/mjpg-streamer-experimental

RUN make && make install

ENV LD_LIBRARY_PATH /streamer/mjpg-streamer-experimental

CMD [ "./mjpg_streamer", "-o", '"output_http.so -w ./www"', "-i", '"input_raspicam.so"' ]