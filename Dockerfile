FROM node:18-slim as node

RUN npm install -g pnpm

WORKDIR /workspace

# COPY package.json .
# COPY package-lock.json .
#RUN npm install