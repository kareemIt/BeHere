# Use lightweight base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies (cached layer)
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy the rest of the files and build the Next.js app
COPY . .
RUN npm run build

# Use minimal runtime image
FROM node:18-alpine

WORKDIR /app

# Copy only the built output and dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "run", "start"]
