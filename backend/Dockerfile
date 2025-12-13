FROM node:20-alpine AS builder

WORKDIR /app

ARG DATABASE_URL=postgresql://user:password@localhost:5432/db?schema=public
ENV DATABASE_URL=${DATABASE_URL}

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma
COPY tsconfig.json tsconfig.build.json nest-cli.json ./

RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma generate && \
    pnpm build && \
    test -f dist/src/main.js || test -f dist/main.js || exit 1

FROM node:20-alpine AS production

WORKDIR /app

RUN npm install -g pnpm && \
    apk add --no-cache wget

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4000

CMD ["pnpm", "start:prod"]

