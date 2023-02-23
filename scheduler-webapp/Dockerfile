# Stage 1: Build an Angular Docker Image
FROM node:16.13.2 as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ARG configuration=docker
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx
COPY --from=build /usr/src/app/dist/out/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

