FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port Next.js will run on (default is 3000)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]