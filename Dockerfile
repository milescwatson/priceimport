# --- Build stage ---
FROM node:22-alpine AS build

# Set working directory
WORKDIR /app
# Install dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* bun.lockb* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
  elif [ -f bun.lockb ]; then npm install -g bun && bun install --frozen-lockfile; \
  else npm install; \
  fi

# Copy project files
COPY . .

# Build the SvelteKit app
RUN npm run build

# --- Runtime stage ---
FROM node:22-alpine AS runtime

WORKDIR /app

# Copy only needed files from build stage
COPY --from=build /app/package.json .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

# Expose app port
EXPOSE 80

# Run SvelteKit with Node adapter
CMD ["node", ".build/index.js"]