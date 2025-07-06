# docker/frontend/Dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY frontend/package*.json ./
RUN npm ci

# Copy source code
COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/next.config.js ./
COPY frontend/tsconfig.json ./
COPY frontend/tailwind.config.js ./
COPY frontend/postcss.config.js ./

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Run the application
CMD ["npm", "start"]
