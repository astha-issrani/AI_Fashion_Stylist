# Use Node.js as the base image
FROM node:18-alpine

WORKDIR /app

# Copy dependency files first for better caching
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port your server.js uses (likely 5000 or 8000)
EXPOSE 8000

# Start the server
CMD ["node", "server.js"]