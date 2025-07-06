#!/bin/bash
echo "🧪 Running tests..."

# Backend tests with coverage
echo "Testing backend..."
cd backend
go test -v -coverprofile=coverage.out ./src/...
go tool cover -html=coverage.out -o coverage.html
echo "Coverage report: backend/coverage.html"

# Frontend tests
echo "Testing frontend..."
cd ../frontend
npm run test

echo "✅ All tests completed!"
