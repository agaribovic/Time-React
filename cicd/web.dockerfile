FROM nginx:stable

ARG envidentity
ARG envapiurl
ARG envimageurl
ARG apisecretdev

ENV ENV_IDENTITY=${envidentity}
ENV ENV_API_URL=${envapiurl}
ENV ENV_IMAGE_URL=${envimageurl}
ENV ENV_SECRET=${apisecretdev}


COPY ./dist usr/share/nginx/html
COPY ./cicd/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
