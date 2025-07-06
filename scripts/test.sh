#!/bin/bash
# scripts/test.sh

echo "🧪 Running all tests..."

# Backend tests with coverage
echo "📋 Testing backend..."
cd backend
go test -v -coverprofile=coverage.out ./src/...
coverage=$(go tool cover -func=coverage.out | grep total | awk '{print $3}')
echo "Backend coverage: $coverage"

# Check if coverage is above 80%
coverage_num=$(echo $coverage | sed 's/%//')
if (( $(echo "$coverage_num < 80" | bc -l) )); then
    echo "⚠️  Warning: Backend coverage is below 80%"
fi

# Frontend tests
echo "📋 Testing frontend..."
cd ../frontend
npm run test -- --passWithNoTests

echo "✅ All tests completed!"

