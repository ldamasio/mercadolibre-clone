# How to Run the MercadoLibre Clone Project

## Prerequisites

- **Go** 1.22 or higher
- **Node.js** 20 or higher
- **Docker** and **Docker Compose** (optional, for containerized setup)

## Quick Start

### Option 1: Using the Setup Script (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd mercadolibre-clone

# Make scripts executable
chmod +x scripts/*.sh

# Run setup script
./scripts/setup.sh

# Start backend (in one terminal)
cd backend
make run

# Start frontend (in another terminal)
cd frontend
npm run dev
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend

# Install dependencies
go mod download
go mod tidy

# Copy environment file
cp .env.example .env

# Run the server
go run src/cmd/server/main.go
# OR using make
make run
```

The backend will be available at: `http://localhost:8080`

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Run development server
npm run dev
```

The frontend will be available at: `http://localhost:3000`

### Option 3: Using Docker Compose

```bash
# From the project root
cd docker
docker-compose up --build
```

This will start both services:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

## Available Commands

### Backend Commands
```bash
cd backend

# Build the application
make build

# Run tests
make test

# Run tests with coverage
make coverage

# Format code
make fmt

# Clean build artifacts
make clean
```

### Frontend Commands
```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint
```

## API Endpoints

- `GET /health` - Health check
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product details
- `GET /api/products/{id}/related` - Get related products
- `GET /api/categories/{id}/products` - Get products by category

## Testing

### Run All Tests
```bash
./scripts/test.sh
```

### Backend Tests Only
```bash
cd backend
make coverage
```

Test coverage must be at least 80%.

## Validation

To validate the entire project setup:
```bash
./scripts/validate.sh
```

## Troubleshooting

### Port Already in Use
If you get a "port already in use" error:
- Backend: Change the PORT in `backend/.env`
- Frontend: Run with `npm run dev -- -p 3001`

### CORS Issues
Make sure the backend is running before starting the frontend. The backend includes CORS middleware that allows all origins in development.

### Missing Data Files
Ensure all JSON files are present in `backend/data/`:
- products.json
- product_details.json
- sellers.json
- reviews.json
- questions.json

## Environment Variables

### Backend (.env)
```
PORT=8080
DATA_PATH=./data
ENV=development
VERSION=1.0.0
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Development Tips

1. **Hot Reload**: Both backend and frontend support hot reload in development mode
2. **API Documentation**: Check `docs/API.md` for detailed API documentation
3. **Design Document**: See `docs/DESIGN_DOCUMENT.md` for architecture decisions

## Production Deployment

For production deployment, use the Docker images:

```bash
# Build images
docker build -f docker/backend/Dockerfile -t mercadolibre-backend .
docker build -f docker/frontend/Dockerfile -t mercadolibre-frontend .

# Run with proper environment variables
docker run -e ENV=production -p 8080:8080 mercadolibre-backend
docker run -e NEXT_PUBLIC_API_URL=<backend-url> -p 3000:3000 mercadolibre-frontend
```

