FROM node:latest as angular
ENV NODE_ENV=production
WORKDIR /app
# COPY package.json /app
# RUN npm install -g @angular/cli 
# RUN npm install --silent 
COPY . .
# RUN ng build --prod

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY  dist/csvizinho-app /ust/share/nginx/html
COPY .config/nginx.conf /etc/nginx/conf.d/default.conf