FROM node:20-alpine AS build

WORKDIR /app

ARG BUILD_ENV=production
ENV BUILD_ENV=$BUILD_ENV

COPY package*.json ./
RUN npm ci --include=dev

COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]  