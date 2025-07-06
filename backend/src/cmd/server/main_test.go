// backend/src/cmd/server/main_test.go
package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/mercadolibre-clone/backend/src/internal/handlers"
	"github.com/mercadolibre-clone/backend/src/internal/middleware"
	"github.com/mercadolibre-clone/backend/src/internal/models"
	"github.com/mercadolibre-clone/backend/src/internal/repository"
)

func TestIntegration(t *testing.T) {
	// Create test data directory
	testDir := t.TempDir()

	// Create test data files
	createTestDataFiles(t, testDir)

	// Initialize repository with test data
	repo := repository.NewProductRepository(testDir)
	if err := repo.LoadData(); err != nil {
		t.Fatalf("Failed to load test data: %v", err)
	}

	// Initialize handlers
	productHandler := handlers.NewProductHandler(repo)
	healthHandler := handlers.NewHealthHandler("test-1.0.0")

	// Setup routes
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", healthHandler.Health)
	mux.HandleFunc("GET /api/products", productHandler.GetAllProducts)
	mux.HandleFunc("GET /api/products/{id}", productHandler.GetProductByID)
	mux.HandleFunc("GET /api/products/{id}/related", productHandler.GetRelatedProducts)
	mux.HandleFunc("GET /api/categories/{id}/products", productHandler.GetProductsByCategory)

	// Apply middleware
	handler := middleware.CORS(mux)

	// Create test server
	server := httptest.NewServer(handler)
	defer server.Close()

	// Test health endpoint
	t.Run("Health Check", func(t *testing.T) {
		resp, err := http.Get(server.URL + "/health")
		if err != nil {
			t.Fatalf("Failed to make request: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			t.Errorf("Expected status 200, got %d", resp.StatusCode)
		}

		var health handlers.HealthResponse
		if err := json.NewDecoder(resp.Body).Decode(&health); err != nil {
			t.Fatalf("Failed to decode response: %v", err)
		}

		if health.Status != "healthy" {
			t.Errorf("Expected status 'healthy', got %s", health.Status)
		}
	})

	// Test get all products
	t.Run("Get All Products", func(t *testing.T) {
		resp, err := http.Get(server.URL + "/api/products")
		if err != nil {
			t.Fatalf("Failed to make request: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			t.Errorf("Expected status 200, got %d", resp.StatusCode)
		}

		var products []models.Product
		if err := json.NewDecoder(resp.Body).Decode(&products); err != nil {
			t.Fatalf("Failed to decode response: %v", err)
		}

		if len(products) != 2 {
			t.Errorf("Expected 2 products, got %d", len(products))
		}
	})

	// Test get product by ID
	t.Run("Get Product By ID", func(t *testing.T) {
		resp, err := http.Get(server.URL + "/api/products/TEST001")
		if err != nil {
			t.Fatalf("Failed to make request: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			t.Errorf("Expected status 200, got %d", resp.StatusCode)
		}

		var productWithDetails models.ProductWithDetails
		if err := json.NewDecoder(resp.Body).Decode(&productWithDetails); err != nil {
			t.Fatalf("Failed to decode response: %v", err)
		}

		if productWithDetails.Product.ID != "TEST001" {
			t.Errorf("Expected product ID TEST001, got %s", productWithDetails.Product.ID)
		}

		if productWithDetails.Seller.ID != "SELLER001" {
			t.Errorf("Expected seller ID SELLER001, got %s", productWithDetails.Seller.ID)
		}
	})

	// Test get non-existent product
	t.Run("Get Non-Existent Product", func(t *testing.T) {
		resp, err := http.Get(server.URL + "/api/products/NOTEXIST")
		if err != nil {
			t.Fatalf("Failed to make request: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusNotFound {
			t.Errorf("Expected status 404, got %d", resp.StatusCode)
		}
	})

	// Test get related products
	t.Run("Get Related Products", func(t *testing.T) {
		resp, err := http.Get(server.URL + "/api/products/TEST001/related?limit=5")
		if err != nil {
			t.Fatalf("Failed to make request: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			t.Errorf("Expected status 200, got %d", resp.StatusCode)
		}

		var products []models.Product
		if err := json.NewDecoder(resp.Body).Decode(&products); err != nil {
			t.Fatalf("Failed to decode response: %v", err)
		}

		if len(products) != 1 {
			t.Errorf("Expected 1 related product, got %d", len(products))
		}
	})

	// Test get products by category
	t.Run("Get Products By Category", func(t *testing.T) {
		resp, err := http.Get(server.URL + "/api/categories/CAT001/products")
		if err != nil {
			t.Fatalf("Failed to make request: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			t.Errorf("Expected status 200, got %d", resp.StatusCode)
		}

		var products []models.Product
		if err := json.NewDecoder(resp.Body).Decode(&products); err != nil {
			t.Fatalf("Failed to decode response: %v", err)
		}

		if len(products) != 2 {
			t.Errorf("Expected 2 products in category, got %d", len(products))
		}
	})

	// Test CORS headers
	t.Run("CORS Headers", func(t *testing.T) {
		resp, err := http.Get(server.URL + "/api/products")
		if err != nil {
			t.Fatalf("Failed to make request: %v", err)
		}
		defer resp.Body.Close()

		corsHeader := resp.Header.Get("Access-Control-Allow-Origin")
		if corsHeader != "*" {
			t.Errorf("Expected CORS header '*', got %s", corsHeader)
		}
	})

	// Test OPTIONS preflight request
	t.Run("CORS Preflight", func(t *testing.T) {
		req, err := http.NewRequest("OPTIONS", server.URL+"/api/products", nil)
		if err != nil {
			t.Fatalf("Failed to create request: %v", err)
		}

		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			t.Fatalf("Failed to make request: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusNoContent {
			t.Errorf("Expected status 204, got %d", resp.StatusCode)
		}

		allowMethods := resp.Header.Get("Access-Control-Allow-Methods")
		if allowMethods == "" {
			t.Error("Expected Access-Control-Allow-Methods header")
		}
	})
}

func createTestDataFiles(t *testing.T, dir string) {
	t.Helper()

	// Create products.json
	products := []models.Product{
		{
			ID:                 "TEST001",
			Title:              "Test Product 1",
			Price:              100.0,
			OriginalPrice:      120.0,
			Currency:           "USD",
			DiscountPercentage: 17,
			Condition:          "new",
			AvailableQuantity:  10,
			SoldQuantity:       5,
			Images:             []string{"/test1.jpg", "/test2.jpg"},
			Thumbnail:          "/test-thumb.jpg",
			FreeShipping:       true,
			Tags:               []string{"test", "featured"},
			SellerID:           "SELLER001",
			CategoryID:         "CAT001",
			CreatedAt:          time.Now(),
			UpdatedAt:          time.Now(),
		},
		{
			ID:                 "TEST002",
			Title:              "Test Product 2",
			Price:              200.0,
			OriginalPrice:      200.0,
			Currency:           "USD",
			DiscountPercentage: 0,
			Condition:          "new",
			AvailableQuantity:  20,
			SoldQuantity:       10,
			Images:             []string{"/test3.jpg"},
			Thumbnail:          "/test-thumb2.jpg",
			FreeShipping:       false,
			Tags:               []string{"test"},
			SellerID:           "SELLER001",
			CategoryID:         "CAT001",
			CreatedAt:          time.Now(),
			UpdatedAt:          time.Now(),
		},
	}

	data, _ := json.MarshalIndent(products, "", "  ")
	os.WriteFile(filepath.Join(dir, "products.json"), data, 0644)

	// Create product_details.json
	details := []models.ProductDetail{
		{
			ID:          "PD001",
			ProductID:   "TEST001",
			Description: "Test product description for product 1",
			Features: models.ProductFeatures{
				Main: []models.Feature{
					{Name: "Feature 1", Value: "Value 1"},
					{Name: "Feature 2", Value: "Value 2"},
				},
			},
			PaymentMethods: []string{"credit_card", "debit_card", "pix"},
			Installments: models.Installments{
				Quantity: 12,
				Amount:   10.0,
				Rate:     0,
				Currency: "USD",
			},
			WarrantyMonths: 12,
			WarrantyType:   "Manufacturer",
			Shipping: models.ShippingInfo{
				FreeShipping:      true,
				LogisticType:      "standard",
				EstimatedDelivery: "3-5 days",
			},
			ViewsCount: 100,
		},
		{
			ID:          "PD002",
			ProductID:   "TEST002",
			Description: "Test product description for product 2",
			Features: models.ProductFeatures{
				Main: []models.Feature{
					{Name: "Feature A", Value: "Value A"},
				},
			},
			PaymentMethods: []string{"credit_card"},
			Installments: models.Installments{
				Quantity: 6,
				Amount:   35.0,
				Rate:     0,
				Currency: "USD",
			},
			WarrantyMonths: 6,
			WarrantyType:   "Seller",
			Shipping: models.ShippingInfo{
				FreeShipping:      false,
				LogisticType:      "standard",
				EstimatedDelivery: "5-7 days",
			},
			ViewsCount: 50,
		},
	}

	data, _ = json.MarshalIndent(details, "", "  ")
	os.WriteFile(filepath.Join(dir, "product_details.json"), data, 0644)

	// Create sellers.json
	sellers := []models.Seller{
		{
			ID:       "SELLER001",
			Nickname: "TestSeller",
			Reputation: models.SellerReputation{
				Level:  5,
				Status: "platinum",
				Transactions: models.TransactionMetrics{
					Completed: 100,
					Canceled:  1,
					Total:     101,
				},
				Ratings: models.RatingMetrics{
					Positive: 99.0,
					Neutral:  0.5,
					Negative: 0.5,
				},
			},
			Tags: []string{"trusted", "fast_shipping"},
			Location: models.Location{
				City:    "Test City",
				State:   "TS",
				Country: "Test Country",
			},
			ExperienceYears: 5,
			LeaderStatus:    "Platinum Leader",
		},
	}

	data, _ = json.MarshalIndent(sellers, "", "  ")
	os.WriteFile(filepath.Join(dir, "sellers.json"), data, 0644)

	// Create empty reviews.json (optional)
	reviews := []models.Review{}
	data, _ = json.MarshalIndent(reviews, "", "  ")
	os.WriteFile(filepath.Join(dir, "reviews.json"), data, 0644)

	// Create empty questions.json (optional)
	questions := []models.Question{}
	data, _ = json.MarshalIndent(questions, "", "  ")
	os.WriteFile(filepath.Join(dir, "questions.json"), data, 0644)
}
