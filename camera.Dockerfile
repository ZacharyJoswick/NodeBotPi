# FROM arm32v7/gcc
FROM raspbian/jessie

RUN apt-get update && apt-get install -y cmake libjpeg8-dev g++ git \
    libraspberrypi-bin pkg-config gphoto2 libgphoto2-6 libsdl2-dev \
    autoconf automake libtool unzip

RUN cd \
    && wget https://github.com/opencv/opencv/archive/3.2.0.zip \
    && unzip 3.2.0.zip \
    && cd opencv-3.2.0 \
    && mkdir build \
    && cd build \
    && cmake .. \
    && make -j8 \
    && make install \
    && cd \
    && rm 3.2.0.zip

RUN git clone https://github.com/protobuf-c/protobuf-c.git /protoc

RUN cd /protoc && 

RUN git clone https://github.com/jacksonliam/mjpg-streamer.git /streamer

WORKDIR /streamer/mjpg-streamer-experimental

RUN make && make install

ENV LD_LIBRARY_PATH /streamer/mjpg-streamer-experimental

CMD [ "./mjpg_streamer", "-o", '"output_http.so -w ./www"', "-i", '"input_raspicam.so"' ]