// backend/src/internal/handlers/product_handler_test.go
package handlers

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/mercadolibre-clone/backend/src/internal/models"
	"github.com/mercadolibre-clone/backend/src/internal/repository"
)

// Mock repository for testing
type mockRepository struct {
	products []models.Product
}

func (m *mockRepository) LoadData() error {
	return nil
}

func (m *mockRepository) GetAllProducts() ([]models.Product, error) {
	return m.products, nil
}

func (m *mockRepository) GetProductByID(id string) (*models.Product, error) {
	for _, p := range m.products {
		if p.ID == id {
			return &p, nil
		}
	}
	return nil, repository.ErrProductNotFound
}

func (m *mockRepository) GetProductWithDetails(id string) (*models.ProductWithDetails, error) {
	product, err := m.GetProductByID(id)
	if err != nil {
		return nil, err
	}

	return &models.ProductWithDetails{
		Product: *product,
		ProductDetail: models.ProductDetail{
			ID:          "PD001",
			ProductID:   product.ID,
			Description: "Test description",
		},
		Seller: models.Seller{
			ID:       "SELLER001",
			Nickname: "TestSeller",
		},
	}, nil
}

func (m *mockRepository) GetRelatedProducts(productID string, limit int) ([]models.Product, error) {
	return m.products[:limit], nil
}

func (m *mockRepository) GetProductsByCategory(categoryID string) ([]models.Product, error) {
	var result []models.Product
	for _, p := range m.products {
		if p.CategoryID == categoryID {
			result = append(result, p)
		}
	}
	return result, nil
}

func TestGetAllProducts(t *testing.T) {
	// Setup
	mockRepo := &mockRepository{
		products: []models.Product{
			{ID: "1", Title: "Product 1", Price: 100},
			{ID: "2", Title: "Product 2", Price: 200},
		},
	}

	handler := NewProductHandler(mockRepo)

	// Create request
	req := httptest.NewRequest("GET", "/api/products", nil)
	w := httptest.NewRecorder()

	// Execute
	handler.GetAllProducts(w, req)

	// Verify
	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200, got %d", w.Code)
	}

	var products []models.Product
	json.NewDecoder(w.Body).Decode(&products)

	if len(products) != 2 {
		t.Errorf("Expected 2 products, got %d", len(products))
	}
}

func TestGetProductByID(t *testing.T) {
	// Setup
	mockRepo := &mockRepository{
		products: []models.Product{
			{ID: "1", Title: "Product 1", Price: 100},
		},
	}

	handler := NewProductHandler(mockRepo)

	// Test existing product
	req := httptest.NewRequest("GET", "/api/products/1", nil)
	req.SetPathValue("id", "1")
	w := httptest.NewRecorder()

	handler.GetProductByID(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200, got %d", w.Code)
	}

	// Test non-existing product
	req = httptest.NewRequest("GET", "/api/products/999", nil)
	req.SetPathValue("id", "999")
	w = httptest.NewRecorder()

	handler.GetProductByID(w, req)

	if w.Code != http.StatusNotFound {
		t.Errorf("Expected status 404, got %d", w.Code)
	}
}
