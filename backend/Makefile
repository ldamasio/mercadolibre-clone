# backend/Makefile
.PHONY: help build run test coverage clean docker-build docker-run

# Variables
BINARY_NAME=server
BINARY_PATH=bin/$(BINARY_NAME)
MAIN_PATH=src/cmd/server/main.go
COVERAGE_FILE=coverage.out

# Default target
help:
	@echo "Available targets:"
	@echo "  build       - Build the application"
	@echo "  run         - Run the application"
	@echo "  test        - Run tests"
	@echo "  coverage    - Run tests with coverage"
	@echo "  clean       - Clean build artifacts"
	@echo "  docker-build - Build Docker image"
	@echo "  docker-run  - Run Docker container"

# Build the application
build:
	@echo "Building..."
	@go build -o $(BINARY_PATH) $(MAIN_PATH)
	@echo "Build complete: $(BINARY_PATH)"

# Run the application
run: build
	@echo "Starting server..."
	@./$(BINARY_PATH)

# Run in development mode with live reload
dev:
	@echo "Starting in development mode..."
	@go run $(MAIN_PATH)

# Run tests
test:
	@echo "Running tests..."
	@go test -v ./src/...

# Run tests with coverage
coverage:
	@echo "Running tests with coverage..."
	@go test -v -coverprofile=$(COVERAGE_FILE) ./src/...
	@go tool cover -html=$(COVERAGE_FILE) -o coverage.html
	@go tool cover -func=$(COVERAGE_FILE)
	@echo "Coverage report generated: coverage.html"

# Clean build artifacts
clean:
	@echo "Cleaning..."
	@rm -rf bin/
	@rm -f $(COVERAGE_FILE) coverage.html
	@echo "Clean complete"

# Build Docker image
docker-build:
	@echo "Building Docker image..."
	@docker build -f ../docker/backend/Dockerfile -t mercadolibre-backend ..
	@echo "Docker build complete"

# Run Docker container
docker-run:
	@echo "Running Docker container..."
	@docker run -p 8080:8080 mercadolibre-backend

# Install dependencies
deps:
	@echo "Installing dependencies..."
	@go mod download
	@go mod tidy
	@echo "Dependencies installed"

# Format code
fmt:
	@echo "Formatting code..."
	@go fmt ./...
	@echo "Code formatted"

# Lint code
lint:
	@echo "Linting code..."
	@golangci-lint run ./...
	@echo "Linting complete"
