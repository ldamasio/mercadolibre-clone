// backend/src/internal/repository/product_repository_test.go
package repository

import (
	"os"
	"path/filepath"
	"testing"
)

func TestNewProductRepository(t *testing.T) {
	repo := NewProductRepository("test_data")
	if repo == nil {
		t.Fatal("Expected repository to be created")
	}
	if repo.dataPath != "test_data" {
		t.Errorf("Expected dataPath to be 'test_data', got %s", repo.dataPath)
	}
}

func TestLoadData(t *testing.T) {
	// Create test data directory
	testDir := t.TempDir()

	// Create test JSON files
	createTestData(t, testDir)

	repo := NewProductRepository(testDir)
	err := repo.LoadData()
	if err != nil {
		t.Fatalf("Failed to load data: %v", err)
	}

	// Verify data was loaded
	if len(repo.products) == 0 {
		t.Error("Expected products to be loaded")
	}
	if len(repo.sellers) == 0 {
		t.Error("Expected sellers to be loaded")
	}
}

func TestGetAllProducts(t *testing.T) {
	testDir := t.TempDir()
	createTestData(t, testDir)

	repo := NewProductRepository(testDir)
	repo.LoadData()

	products, err := repo.GetAllProducts()
	if err != nil {
		t.Fatalf("Failed to get products: %v", err)
	}

	if len(products) != 1 {
		t.Errorf("Expected 1 product, got %d", len(products))
	}
}

func TestGetProductByID(t *testing.T) {
	testDir := t.TempDir()
	createTestData(t, testDir)

	repo := NewProductRepository(testDir)
	repo.LoadData()

	// Test existing product
	product, err := repo.GetProductByID("TEST001")
	if err != nil {
		t.Fatalf("Failed to get product: %v", err)
	}
	if product.ID != "TEST001" {
		t.Errorf("Expected product ID TEST001, got %s", product.ID)
	}

	// Test non-existing product
	_, err = repo.GetProductByID("NOTEXIST")
	if err != ErrProductNotFound {
		t.Errorf("Expected ErrProductNotFound, got %v", err)
	}
}

func TestGetProductWithDetails(t *testing.T) {
	testDir := t.TempDir()
	createTestData(t, testDir)

	repo := NewProductRepository(testDir)
	repo.LoadData()

	details, err := repo.GetProductWithDetails("TEST001")
	if err != nil {
		t.Fatalf("Failed to get product with details: %v", err)
	}

	if details.Product.ID != "TEST001" {
		t.Errorf("Expected product ID TEST001, got %s", details.Product.ID)
	}
	if details.Seller.ID != "SELLER001" {
		t.Errorf("Expected seller ID SELLER001, got %s", details.Seller.ID)
	}
}

// Helper function to create test data
func createTestData(t *testing.T, dir string) {
	t.Helper()

	// Products
	productsJSON := `[{
		"id": "TEST001",
		"title": "Test Product",
		"price": 100.0,
		"currency": "USD",
		"condition": "new",
		"available_quantity": 10,
		"sold_quantity": 5,
		"images": ["/test.jpg"],
		"thumbnail": "/test-thumb.jpg",
		"free_shipping": true,
		"tags": ["test"],
		"seller_id": "SELLER001",
		"category_id": "CAT001",
		"created_at": "2024-01-01T00:00:00Z",
		"updated_at": "2024-01-01T00:00:00Z"
	}]`

	// Product details
	detailsJSON := `[{
		"id": "PD001",
		"product_id": "TEST001",
		"description": "Test description",
		"features": {
			"main": [{"name": "Test", "value": "Value"}]
		},
		"payment_methods": ["credit_card"],
		"installments": {"quantity": 12, "amount": 10.0, "rate": 0, "currency": "USD"},
		"warranty_months": 12,
		"warranty_type": "Test",
		"shipping": {"free_shipping": true, "logistic_type": "test", "estimated_delivery": "Test"},
		"views_count": 100
	}]`

	// Sellers
	sellersJSON := `[{
		"id": "SELLER001",
		"nickname": "TestSeller",
		"reputation": {
			"level": 5,
			"status": "platinum",
			"transactions": {"completed": 100, "canceled": 1, "total": 101},
			"ratings": {"positive": 99.0, "neutral": 0.5, "negative": 0.5}
		},
		"tags": ["test"],
		"location": {"city": "Test City", "state": "TS", "country": "Test"},
		"experience_years": 1,
		"leader_status": "Test Leader"
	}]`

	// Write files
	os.WriteFile(filepath.Join(dir, "products.json"), []byte(productsJSON), 0644)
	os.WriteFile(filepath.Join(dir, "product_details.json"), []byte(detailsJSON), 0644)
	os.WriteFile(filepath.Join(dir, "sellers.json"), []byte(sellersJSON), 0644)
}
