FROM node:18-alpine as build-stage
LABEL maintainer="Leo 'song.lhlh@gmail.com'"

WORKDIR /app
COPY . ./

ARG VITE_ALLOW_CODE
ENV VITE_ALLOW_CODE=$VITE_ALLOW_CODE

# 添加以下行，明确指定 ONNX Runtime 使用 CPU
ENV ONNXRUNTIME_EXECUTION_PROVIDERS=CPU_ExecutionProvider

RUN apk add --no-cache python3 make g++

RUN echo "https://registry.npmmirror.com" > .npmrc && \

    npm install -g pnpm@8.7.6 && \
    pnpm install --frozen-lockfile && \
    pnpm build

FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html/dist
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
