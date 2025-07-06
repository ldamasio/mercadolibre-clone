// backend/src/internal/handlers/product_handler.go
package handlers

import (
	"net/http"
	"strconv"

	"github.com/mercadolibre-clone/backend/src/internal/repository"
	"github.com/mercadolibre-clone/backend/src/pkg/utils"
)

// ProductHandler handles product-related HTTP requests
type ProductHandler struct {
	repo repository.ProductRepositoryInterface
}

// NewProductHandler creates a new product handler
func NewProductHandler(repo repository.ProductRepositoryInterface) *ProductHandler {
	return &ProductHandler{repo: repo}
}

// GetAllProducts handles GET /api/products
func (h *ProductHandler) GetAllProducts(w http.ResponseWriter, r *http.Request) {
	products, err := h.repo.GetAllProducts()
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, products)
}

// GetProductByID handles GET /api/products/:id
func (h *ProductHandler) GetProductByID(w http.ResponseWriter, r *http.Request) {
	// Extract ID from URL path
	id := r.PathValue("id")
	if id == "" {
		utils.RespondWithError(w, http.StatusBadRequest, "product ID is required")
		return
	}

	product, err := h.repo.GetProductWithDetails(id)
	if err != nil {
		if err == repository.ErrProductNotFound {
			utils.RespondWithError(w, http.StatusNotFound, "product not found")
			return
		}
		utils.RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, product)
}

// GetRelatedProducts handles GET /api/products/:id/related
func (h *ProductHandler) GetRelatedProducts(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if id == "" {
		utils.RespondWithError(w, http.StatusBadRequest, "product ID is required")
		return
	}

	// Get limit from query params
	limitStr := r.URL.Query().Get("limit")
	limit := 10 // default
	if limitStr != "" {
		if l, err := strconv.Atoi(limitStr); err == nil && l > 0 {
			limit = l
		}
	}

	products, err := h.repo.GetRelatedProducts(id, limit)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, products)
}

// GetProductsByCategory handles GET /api/categories/:id/products
func (h *ProductHandler) GetProductsByCategory(w http.ResponseWriter, r *http.Request) {
	categoryID := r.PathValue("id")
	if categoryID == "" {
		utils.RespondWithError(w, http.StatusBadRequest, "category ID is required")
		return
	}

	products, err := h.repo.GetProductsByCategory(categoryID)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, products)
}
