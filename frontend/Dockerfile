FROM node:18-buster as builder
RUN mkdir -p /usr/src/next-nginx
WORKDIR /usr/src/next-nginx
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# remove existing files from nginx directory
RUN rm -rf /usr/share/nginx/html/*
# copy built assets from 'builder' stage
COPY --from=builder /usr/src/next-nginx/out /usr/share/nginx/html
# add nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# expose port 80 for nginx
EXPOSE 80
# start nginx
CMD ["nginx", "-g", "daemon off;"]