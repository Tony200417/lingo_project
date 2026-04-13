# Use Node.js 20 slim as the base image for a small footprint
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install production and development dependencies (needed for build and tsx)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend project
RUN npm run build

# Expose the port the app runs on (matching server.ts)
EXPOSE 3000

# Set the environment to production
ENV NODE_ENV=production

# The start script runs 'tsx server.ts' as defined in package.json
CMD ["npm", "run", "start"]
