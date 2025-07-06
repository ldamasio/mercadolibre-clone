#!/bin/bash
# scripts/validate.sh

echo "🔍 Validating MercadoLibre Clone project..."

# Check backend
echo "Checking backend..."
if [ ! -f "backend/go.mod" ]; then
    echo "❌ Backend go.mod not found"
    exit 1
fi

# Check if backend can build
cd backend
if go build -o /tmp/test-build ./src/cmd/server/main.go; then
    echo "✅ Backend builds successfully"
    rm /tmp/test-build
else
    echo "❌ Backend build failed"
    exit 1
fi

# Check if data files exist
if [ ! -f "data/products.json" ]; then
    echo "❌ products.json not found"
    exit 1
fi

if [ ! -f "data/sellers.json" ]; then
    echo "❌ sellers.json not found"
    exit 1
fi

# Check frontend
cd ../frontend
echo "Checking frontend..."
if [ ! -f "package.json" ]; then
    echo "❌ Frontend package.json not found"
    exit 1
fi

# Check if frontend can build
if npm run build; then
    echo "✅ Frontend builds successfully"
else
    echo "❌ Frontend build failed"
    exit 1
fi

# Check test coverage
cd ../backend
echo "Checking test coverage..."
go test -coverprofile=coverage.out ./src/... > /dev/null 2>&1
coverage=$(go tool cover -func=coverage.out | grep total | awk '{print $3}' | sed 's/%//')
echo "Backend coverage: ${coverage}%"

if (( $(echo "$coverage >= 80" | bc -l) )); then
    echo "✅ Coverage meets requirement (≥80%)"
else
    echo "❌ Coverage below requirement (<80%)"
fi

echo "✅ Validation complete!"
