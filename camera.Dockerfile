FROM raspbian/jessie

RUN apt-get update && apt-get install -y libraspberrypi-bin git make cmake libjpeg-dev

RUN apt-get install -y subversion 

RUN svn co https://github.com/raspberrypi/firmware/trunk/opt/vc/include /opt/vc/include

RUN git clone https://github.com/jacksonliam/mjpg-streamer.git /streamer

WORKDIR /streamer/mjpg-streamer-experimental

RUN make && make install

ENV LD_LIBRARY_PATH /streamer/mjpg-streamer-experimental

# COPY ./input_raspicam.so .

CMD [ "./mjpg_streamer", "-o", '"output_http.so -w ./www"', "-i", '"input_raspicam.so"' ]

#manual run command
#./mjpg_streamer -o "output_http.so -w ./www" -i "input_raspicam.so"