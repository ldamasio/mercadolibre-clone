#!/bin/bash
# scripts/setup.sh

echo "🚀 Setting up MercadoLibre Clone..."

# Check if Go is installed
if ! command -v go &> /dev/null; then
    echo "❌ Go is not installed. Please install Go first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Backend setup
echo "📦 Setting up backend..."
cd backend
go mod download
go mod tidy
echo "✅ Backend dependencies installed"

# Frontend setup
echo "📦 Setting up frontend..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"

# Create .env files from examples
cd ..
if [ -f "backend/.env.example" ] && [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env"
fi

if [ -f "frontend/.env.local.example" ] && [ ! -f "frontend/.env.local" ]; then
    cp frontend/.env.local.example frontend/.env.local
    echo "✅ Created frontend/.env.local"
fi

echo "✅ Setup complete! You can now run:"
echo "   - Backend: cd backend && make run"
echo "   - Frontend: cd frontend && npm run dev"
