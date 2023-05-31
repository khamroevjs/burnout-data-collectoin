FROM node:18-alpine AS builder
WORKDIR /frontend
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM busybox:uclibc
COPY --from=builder /frontend/build /frontend
CMD ["sh"]
