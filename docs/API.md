# API Documentation - MercadoLibre Clone

## Base URL
```
http://localhost:8080/api
```

## Endpoints

### Health Checks

#### GET /health
Check if the API is running and healthy.

**Response**
```json
{
  "status": "healthy",
  "version": "1.0.0"
}
```

### Products

#### GET /api/products
Get all products.

**Response**
```json
[
  {
    "id": "MLB123456789",
    "title": "Samsung Galaxy A55 5G Dual SIM 256 GB azul escuro 8 GB RAM",
    "price": 439.00,
    "original_price": 499.00,
    "currency": "USD",
    "discount_percentage": 12,
    "condition": "new",
    "available_quantity": 150,
    "sold_quantity": 1769,
    "images": [...],
    "thumbnail": "/images/samsung-a55-thumb.jpg",
    "free_shipping": true,
    "tags": ["best_seller", "brand_official"],
    "seller_id": "SELLER001",
    "category_id": "MLB1055",
    "created_at": "2024-06-15T10:30:00Z",
    "updated_at": "2024-12-20T14:45:00Z"
  }
]
```

#### GET /api/products/{id}
Get detailed information about a specific product.

**Parameters**
- `id` (path): Product ID

**Response**
```json
{
  "product": {
    "id": "MLB123456789",
    "title": "Samsung Galaxy A55 5G Dual SIM 256 GB azul escuro 8 GB RAM",
    "price": 439.00,
    "original_price": 499.00,
    "currency": "USD",
    "discount_percentage": 12,
    "condition": "new",
    "available_quantity": 150,
    "sold_quantity": 1769,
    "images": [...],
    "thumbnail": "/images/samsung-a55-thumb.jpg",
    "free_shipping": true,
    "tags": ["best_seller"],
    "seller_id": "SELLER001",
    "category_id": "MLB1055"
  },
  "product_detail": {
    "id": "PD001",
    "product_id": "MLB123456789",
    "description": "Com um potente processador...",
    "features": {
      "main": [
        {"name": "Memória interna", "value": "256 GB"},
        {"name": "Memória RAM", "value": "8 GB"}
      ],
      "screen": {
        "size": "6.6\"",
        "resolution": "1080 x 2340 px",
        "technology": "Super AMOLED"
      },
      "dimensions": {
        "height": "161.1 mm",
        "width": "77.4 mm",
        "depth": "8.2 mm",
        "weight": "213 g"
      }
    },
    "payment_methods": ["credit_card", "debit_card", "pix"],
    "installments": {
      "quantity": 12,
      "amount": 36.58,
      "rate": 0,
      "currency": "USD"
    },
    "warranty_months": 12,
    "warranty_type": "Garantia do vendedor",
    "shipping": {
      "free_shipping": true,
      "logistic_type": "fulfillment",
      "estimated_delivery": "Chegará entre segunda e quarta-feira"
    },
    "views_count": 15420
  },
  "seller": {
    "id": "SELLER001",
    "nickname": "TECNOFAST",
    "reputation": {
      "level": 5,
      "status": "platinum",
      "transactions": {
        "completed": 12543,
        "canceled": 156,
        "total": 12699
      },
      "ratings": {
        "positive": 98.5,
        "neutral": 1.0,
        "negative": 0.5
      }
    },
    "tags": ["brand", "large_seller"],
    "location": {
      "city": "São Paulo",
      "state": "SP",
      "country": "Brasil"
    },
    "experience_years": 5,
    "leader_status": "MercadoLíder Platinum"
  },
  "reviews": [
    {
      "id": "REV001",
      "product_id": "MLB123456789",
      "user_id": "USER001",
      "username": "João Silva",
      "rating": 5,
      "comment": "Excelente celular!",
      "helpful_count": 45,
      "created_at": "2024-12-15T09:30:00Z"
    }
  ],
  "questions": [
    {
      "id": "Q001",
      "product_id": "MLB123456789",
      "question": "Esse modelo tem entrada para fone de ouvido?",
      "answer": "Olá! Este modelo não possui entrada...",
      "created_at": "2024-12-18T11:00:00Z",
      "answered_at": "2024-12-18T11:30:00Z"
    }
  ]
}
```

**Error Responses**
- `404 Not Found` - Product not found
- `500 Internal Server Error` - Server error

#### GET /api/products/{id}/related
Get products related to a specific product.

**Parameters**
- `id` (path): Product ID
- `limit` (query, optional): Number of related products to return (default: 10)

**Response**
```json
[
  {
    "id": "MLB987654321",
    "title": "Motorola Edge 50 Fusion 5G",
    "price": 419.00,
    "thumbnail": "/images/motorola-edge-thumb.jpg",
    "free_shipping": true,
    "tags": ["new_release", "5g"]
  }
]
```

### Categories

#### GET /api/categories/{id}/products
Get all products in a specific category.

**Parameters**
- `id` (path): Category ID

**Response**
```json
[
  {
    "id": "MLB123456789",
    "title": "Samsung Galaxy A55 5G",
    "price": 439.00,
    "category_id": "MLB1055"
  }
]
```

## Error Handling

All error responses follow this format:

```json
{
  "error": "Error Type",
  "message": "Detailed error message"
}
```

## CORS

The API supports CORS for all origins. The following headers are included in responses:

- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

## Rate Limiting

Currently, there is no rate limiting implemented. This may be added in future versions.

## Authentication

No authentication is required for any endpoints in the current version.
