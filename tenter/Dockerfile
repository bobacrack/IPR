# Base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Serve the built static files using a lightweight web server
RUN npm install -g serve

# Set the command to run the application when the container starts
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose port 3000 to allow external access
EXPOSE 3000