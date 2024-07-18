FROM alpine:3

RUN apk --update add  procps
RUN apk fetch openjdk17
RUN apk add openjdk17
RUN apk add --no-cache bash

RUN apk add ttf-dejavu

RUN fc-cache --force

RUN addgroup -S visionwaves && adduser -S -G visionwaves visionwaves
RUN apk add curl
RUN curl -O https://dl.min.io/client/mc/release/linux-amd64/mc && chmod +x mc && mv mc /usr/local/bin/
MAINTAINER visionwaves
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

ENV SERVICE_ARCHIVE superapp-build

ENV SERVICE_PATH /opt/visionwaves/$SERVICE_ARCHIVE

ENV BASE_PATH /opt/visionwaves/$SERVICE_ARCHIVE

ENV USER_NAME root

RUN mkdir -p "$BASE_PATH"

#ADD ./$SERVICE_ARCHIVE.tar $BASE_PATH
COPY ./$SERVICE_ARCHIVE.tar $BASE_PATH
RUN cd $BASE_PATH && tar -xvzf ./$SERVICE_ARCHIVE.tar
    
#ADD ./melodyposthook.sh /opt/

RUN chown -R $USER_NAME:$USER_NAME $BASE_PATH

#UserAdd
USER $USER_NAME

WORKDIR $SERVICE_PATH

RUN chown -R visionwaves:visionwaves $SERVICE_PATH
USER visionwaves

#Persisting volume from local storage to reduce loss of data
CMD bash run.sh start ; sleep 5s ; tail -f  logs/superapp-app.log
