FROM ubuntu:jammy

LABEL maintainer="Spright" \
  description="Basic C++ tools for CircleCi." \
  version="0.1.0"
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update -y
RUN apt-get install libx11-dev -y
RUN apt-get install -y libxrandr-dev
RUN apt-get install -y libxinerama-dev
RUN apt-get install -y libxcursor-dev
RUN apt-get install -y libxi-dev
RUN apt-get install --yes software-properties-common
RUN apt-get install -y --no-install-recommends\
  git \
  gdb \
  gcc \
  g++ \
  make \
  cmake
RUN apt-get install libglvnd-dev libgl1-mesa-dev libegl1-mesa-dev libxext6 libx11-6 libgl-dev libosmesa-dev -y
RUN apt-get install clang-format -y
RUN apt-get install python2 -y
RUN apt-get install lcov -y
RUN apt-get install python3-pip -y
RUN pip install gcovr
RUN update-alternatives --install /usr/bin/python python /usr/bin/python2.7 10
