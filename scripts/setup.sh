#!/bin/bash
echo "🚀 Setting up MercadoLibre Clone..."

# Backend setup
echo "📦 Setting up backend..."
cd backend
go mod download
go mod tidy

# Frontend setup
echo "📦 Setting up frontend..."
cd ../frontend
npm install

echo "✅ Setup complete!"
