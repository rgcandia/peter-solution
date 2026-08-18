FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
RUN npm install

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY prisma ./prisma
RUN npm install --omit=dev && npm run prisma:generate

COPY --from=builder /app/dist ./dist

EXPOSE 4000

USER node

CMD ["node", "dist/index.js"]
