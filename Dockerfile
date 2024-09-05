# Stage 1: Build the Next.js app
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Serve the Next.js app
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy the build output and node_modules from the build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Expose port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
