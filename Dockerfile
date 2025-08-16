# --- Build stage ---
FROM node:24-alpine AS build
ARG MYSQL_HOST=db-mysql-sfo2-41885-do-user-18047834-0.h.db.ondigitalocean.com
ARG MYSQL_USER=priceimportuser
ARG MYSQL_PASSWORD=qSRXjvPAZ8mfZBL
ARG MYSQL_DATABASE=priceimport
ARG MYSQL_PORT=25060

# Intuit Oauth2 data
ARG INTUIT_CLIENT_ID=ABZbmhpDTZaQfqp5ILnYLCIoHu2hEEhDmyfpX75VjexlVc0pMg
ARG INTUIT_CLIENT_SECRET=uJJMJVikiPYnrYOMED4kX8Yxm76ublIy73MgreCr
ARG INTUIT_SCOPE=com.intuit.quickbooks.accounting
ARG INTUIT_REDIRECT_URI=https://development.priceimport.com/api/intuit-oauth2-redirect-url
ARG INTUIT_STATE=state_placeholder
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
FROM node:24-alpine AS runtime

WORKDIR /app

# Copy only needed files from build stage
COPY --from=build /app/package.json .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

# Expose app port
EXPOSE 80

# Run SvelteKit with Node adapter
CMD ["node", "build"]