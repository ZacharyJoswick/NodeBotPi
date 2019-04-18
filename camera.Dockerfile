# FROM arm32v7/gcc
FROM raspbian/jessie

RUN apt-get update

RUN apt-get install -y libjpeg-dev libtiff-dev libdirectfb-dev 

RUN apt-get install -y cmake  g++ git \
    libraspberrypi-bin gphoto2 libgphoto2-6 libsdl2-dev \
    autoconf automake libtool unzip libsdl-image1.2-dev libsdl-dev \
    build-essential imagemagick libv4l-dev python-numpy

# RUN  cd \ 
#     && git clone https://github.com/protocolbuffers/protobuf.git \
#     && cd protobuf \
#     && git submodule update --init --recursive \
#     &&  ./autogen.sh \
#     && ./configure \
#     && make \
#     && make check \
#     && make install \
#     && ldconfig

RUN cd \
    && wget https://github.com/opencv/opencv/archive/3.2.0.zip \
    && unzip 3.2.0.zip \
    && cd opencv-3.2.0 \
    && mkdir build \
    && cd build \
    && cmake .. \
    && make \
    && make install \
    && cd \
    && rm 3.2.0.zip

# RUN git clone https://github.com/protobuf-c/protobuf-c.git /protoc

# RUN cd /protoc && ./autogen.sh && ./configure && make && make install

RUN git clone https://github.com/jacksonliam/mjpg-streamer.git /streamer

WORKDIR /streamer/mjpg-streamer-experimental

RUN make && make install

ENV LD_LIBRARY_PATH /streamer/mjpg-streamer-experimental

CMD [ "./mjpg_streamer", "-o", '"output_http.so -w ./www"', "-i", '"input_raspicam.so"' ]