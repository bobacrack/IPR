# Use the official Golang base image
FROM golang:1.20.5-alpine

# Set the working directory inside the container
WORKDIR /backend

# Copy the Go module files to enable caching of dependencies
COPY go.mod go.sum ./

# Download and install Go dependencies
RUN go mod download

# Copy the rest of the application source code to the container
COPY . .

# Build the Go application
RUN go build -o backend .

# Expose port 6969 to allow external access
EXPOSE 6969

# Set the command to run the application when the container starts
CMD ["./backend"]
