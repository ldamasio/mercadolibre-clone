// backend/src/internal/repository/product_repository.go
package repository

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"sync"

	"github.com/mercadolibre-clone/backend/src/internal/models"
)

var (
	ErrProductNotFound = errors.New("product not found")
	ErrSellerNotFound  = errors.New("seller not found")
)

// ProductRepository handles product data operations
type ProductRepository struct {
	dataPath string
	mu       sync.RWMutex

	// Cache for loaded data
	products       []models.Product
	productDetails map[string]models.ProductDetail
	sellers        map[string]models.Seller
	reviews        map[string][]models.Review
	questions      map[string][]models.Question
}

// NewProductRepository creates a new product repository
func NewProductRepository(dataPath string) *ProductRepository {
	return &ProductRepository{
		dataPath:       dataPath,
		productDetails: make(map[string]models.ProductDetail),
		sellers:        make(map[string]models.Seller),
		reviews:        make(map[string][]models.Review),
		questions:      make(map[string][]models.Question),
	}
}

// LoadData loads all data from JSON files
func (r *ProductRepository) LoadData() error {
	r.mu.Lock()
	defer r.mu.Unlock()

	// Load products
	if err := r.loadProducts(); err != nil {
		return fmt.Errorf("loading products: %w", err)
	}

	// Load product details
	if err := r.loadProductDetails(); err != nil {
		return fmt.Errorf("loading product details: %w", err)
	}

	// Load sellers
	if err := r.loadSellers(); err != nil {
		return fmt.Errorf("loading sellers: %w", err)
	}

	// Load reviews
	if err := r.loadReviews(); err != nil {
		return fmt.Errorf("loading reviews: %w", err)
	}

	// Load questions
	if err := r.loadQuestions(); err != nil {
		return fmt.Errorf("loading questions: %w", err)
	}

	return nil
}

// GetAllProducts returns all products
func (r *ProductRepository) GetAllProducts() ([]models.Product, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	if len(r.products) == 0 {
		return nil, errors.New("no products loaded")
	}

	return r.products, nil
}

// GetProductByID returns a product by ID
func (r *ProductRepository) GetProductByID(id string) (*models.Product, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	for _, p := range r.products {
		if p.ID == id {
			return &p, nil
		}
	}

	return nil, ErrProductNotFound
}

// GetProductWithDetails returns complete product information
func (r *ProductRepository) GetProductWithDetails(id string) (*models.ProductWithDetails, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	// Find product
	var product *models.Product
	for _, p := range r.products {
		if p.ID == id {
			product = &p
			break
		}
	}

	if product == nil {
		return nil, ErrProductNotFound
	}

	// Get product details
	detail, exists := r.productDetails[id]
	if !exists {
		return nil, fmt.Errorf("product details not found for ID: %s", id)
	}

	// Get seller
	seller, exists := r.sellers[product.SellerID]
	if !exists {
		return nil, ErrSellerNotFound
	}

	// Get reviews and questions
	reviews := r.reviews[id]
	questions := r.questions[id]

	return &models.ProductWithDetails{
		Product:       *product,
		ProductDetail: detail,
		Seller:        seller,
		Reviews:       reviews,
		Questions:     questions,
	}, nil
}

// GetProductsByCategory returns products by category
func (r *ProductRepository) GetProductsByCategory(categoryID string) ([]models.Product, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	var products []models.Product
	for _, p := range r.products {
		if p.CategoryID == categoryID {
			products = append(products, p)
		}
	}

	if len(products) == 0 {
		return nil, fmt.Errorf("no products found for category: %s", categoryID)
	}

	return products, nil
}

// GetRelatedProducts returns products related to the given product
func (r *ProductRepository) GetRelatedProducts(productID string, limit int) ([]models.Product, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	product, err := r.GetProductByID(productID)
	if err != nil {
		return nil, err
	}

	var related []models.Product
	for _, p := range r.products {
		if p.ID != productID && p.CategoryID == product.CategoryID {
			related = append(related, p)
			if len(related) >= limit {
				break
			}
		}
	}

	return related, nil
}

// Private methods for loading data

func (r *ProductRepository) loadProducts() error {
	data, err := os.ReadFile(filepath.Join(r.dataPath, "products.json"))
	if err != nil {
		return err
	}

	return json.Unmarshal(data, &r.products)
}

func (r *ProductRepository) loadProductDetails() error {
	data, err := os.ReadFile(filepath.Join(r.dataPath, "product_details.json"))
	if err != nil {
		return err
	}

	var details []models.ProductDetail
	if err := json.Unmarshal(data, &details); err != nil {
		return err
	}

	for _, detail := range details {
		r.productDetails[detail.ProductID] = detail
	}

	return nil
}

func (r *ProductRepository) loadSellers() error {
	data, err := os.ReadFile(filepath.Join(r.dataPath, "sellers.json"))
	if err != nil {
		return err
	}

	var sellers []models.Seller
	if err := json.Unmarshal(data, &sellers); err != nil {
		return err
	}

	for _, seller := range sellers {
		r.sellers[seller.ID] = seller
	}

	return nil
}

func (r *ProductRepository) loadReviews() error {
	data, err := os.ReadFile(filepath.Join(r.dataPath, "reviews.json"))
	if err != nil {
		// Reviews are optional
		if os.IsNotExist(err) {
			return nil
		}
		return err
	}

	var reviews []models.Review
	if err := json.Unmarshal(data, &reviews); err != nil {
		return err
	}

	for _, review := range reviews {
		r.reviews[review.ProductID] = append(r.reviews[review.ProductID], review)
	}

	return nil
}

func (r *ProductRepository) loadQuestions() error {
	data, err := os.ReadFile(filepath.Join(r.dataPath, "questions.json"))
	if err != nil {
		// Questions are optional
		if os.IsNotExist(err) {
			return nil
		}
		return err
	}

	var questions []models.Question
	if err := json.Unmarshal(data, &questions); err != nil {
		return err
	}

	for _, question := range questions {
		r.questions[question.ProductID] = append(r.questions[question.ProductID], question)
	}

	return nil
}
