# parent image
FROM node:latest

# install needed packages
RUN echo 'nameserver 8.8.8.8' >> /etc/resolve.conf && echo 'nameserver 8.8.4.4' >> /etc/resolve.conf
RUN apt-get update && apt-get install -y \
    net-tools \
    iputils-ping \
    iproute2 \
    telnet telnetd \
    iperf
RUN npm install express request systeminformation yargs
RUN mkdir SDCI
WORKDIR SDCI
RUN git init
RUN git config user.email "thomasbobi.bobillot@gmail.com"
RUN git config user.name "Bobillot"
RUN git pull http://Bobillot:7c5bb14b95a7563dff91b58ee88bff9af8386693@github.com/Bobillot/Projet-SDCI master
RUN curl -X GET http://homepages.laas.fr/smedjiah/tmp/gateway.js >> gateway.js
RUN curl -X GET http://homepages.laas.fr/smedjiah/tmp/server.js >> server.js
RUN curl -X GET http://homepages.laas.fr/smedjiah/tmp/device.js >> device.js

# set entry point for emulator gatekeeper
ENV VIM_EMU_CMD "iperf -s -D"
ENV VIM_EMU_CMD_STOP "echo 'Stop iperf_server'"

