# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY backend/package*.json ./backend/
COPY package*.json ./

# Install dependencies
RUN npm install --production
RUN cd backend && npm install --production

# Copy application code
COPY . .

# Build frontend
RUN npm run build

# Expose port
EXPOSE 5000

# Start command
CMD ["node", "backend/server.js"]
