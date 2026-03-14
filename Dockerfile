FROM --platform=linux/amd64 docker.io/guergeiro/pnpm:lts-latest AS builder

WORKDIR /build

COPY . .

RUN pnpm install
RUN pnpm build

FROM docker.io/node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack pnpm install --prod --frozen-lockfile --ignore-scripts

COPY --from=builder /build/dist ./dist
COPY config ./config
COPY server ./server

ENV PORT=2048

EXPOSE 2048

CMD ["node", "server/index.mjs"]
