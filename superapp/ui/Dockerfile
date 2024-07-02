FROM visionwaves/nginx:1.21.13
ARG APP_NAME
ENV BASE_PATH=/data/webapp/visionwaves/ \
    APP_NAME=$APP_NAME
RUN mkdir -p $BASE_PATH

ADD ./$APP_NAME.tar $BASE_PATH