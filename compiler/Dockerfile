FROM ubuntu:bionic

WORKDIR /app

ENV LANG C.UTF-8

RUN apt-get update

RUN apt-get install -y curl
RUN apt-get install -y build-essential

RUN curl -LO https://nodejs.org/dist/v12.13.0/node-v12.13.0-linux-x64.tar.xz
RUN tar -xf node-v12.13.0-linux-x64.tar.xz -C /opt
RUN ln -s /opt/node-v12.13.0-linux-x64/bin/node /bin
RUN ln -s /opt/node-v12.13.0-linux-x64/bin/npm /bin
RUN ln -s /opt/node-v12.13.0-linux-x64/bin/npx /bin

RUN apt-get install -y g++-mingw-w64-x86-64
RUN apt-get install -y gcc-mingw-w64-x86-64

RUN apt-get install -y g++-mingw-w64-i686
RUN apt-get install -y gcc-mingw-w64-i686

RUN apt-get install -y mingw-w64

RUN apt-get install -y ruby-full

RUN apt-get install -y python3
RUN apt-get install -y python3-pip

RUN python3 -m pip install requests

COPY ./ScribbleBase.py /usr/lib/python3.6/ScribbleBase.py

COPY ./package.json /app/package.json
RUN npm install
COPY . /app

CMD ["npm",  "start"]

