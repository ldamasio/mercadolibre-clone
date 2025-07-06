// backend/src/internal/repository/interface.go
package repository

import "github.com/mercadolibre-clone/backend/src/internal/models"

// ProductRepositoryInterface defines the contract for product repository
type ProductRepositoryInterface interface {
	LoadData() error
	GetAllProducts() ([]models.Product, error)
	GetProductByID(id string) (*models.Product, error)
	GetProductWithDetails(id string) (*models.ProductWithDetails, error)
	GetProductsByCategory(categoryID string) ([]models.Product, error)
	GetRelatedProducts(productID string, limit int) ([]models.Product, error)
}
