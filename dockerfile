# Use the base image
FROM node:18-alpine AS base
RUN npm install -g pnpm
RUN npm install -g turbo

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
COPY . .

# Inject environment variables from Docker Compose into the build process
ARG DATABASE_URL
ARG REDIS_URL
ARG SESSION_SECRET
ENV DATABASE_URL=${DATABASE_URL}
ENV REDIS_URL=${REDIS_URL}
ENV SESSION_SECRET=${SESSION_SECRET}

RUN turbo prune keystone --docker

FROM base AS runner
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Build the project
COPY --from=builder /app/out/full/ .
ENV NODE_ENV=production

RUN pnpm install
RUN pnpm build

# Don't run production as root
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs

# Command to start the application

CMD ["pnpm", "prod"]

EXPOSE 3000
