// backend/src/internal/models/product.go
package models

import "time"

// Product represents a product in the marketplace
type Product struct {
	ID                 string    `json:"id"`
	Title              string    `json:"title"`
	Price              float64   `json:"price"`
	OriginalPrice      float64   `json:"original_price,omitempty"`
	Currency           string    `json:"currency"`
	DiscountPercentage int       `json:"discount_percentage,omitempty"`
	Condition          string    `json:"condition"` // new, used
	AvailableQuantity  int       `json:"available_quantity"`
	SoldQuantity       int       `json:"sold_quantity"`
	Images             []string  `json:"images"`
	Thumbnail          string    `json:"thumbnail"`
	FreeShipping       bool      `json:"free_shipping"`
	Tags               []string  `json:"tags"`
	SellerID           string    `json:"seller_id"`
	CategoryID         string    `json:"category_id"`
	CreatedAt          time.Time `json:"created_at"`
	UpdatedAt          time.Time `json:"updated_at"`
}

// ProductDetail contains additional product information
type ProductDetail struct {
	ID             string          `json:"id"`
	ProductID      string          `json:"product_id"`
	Description    string          `json:"description"`
	Features       ProductFeatures `json:"features"`
	PaymentMethods []string        `json:"payment_methods"`
	Installments   Installments    `json:"installments"`
	WarrantyMonths int             `json:"warranty_months"`
	WarrantyType   string          `json:"warranty_type"`
	Shipping       ShippingInfo    `json:"shipping"`
	ViewsCount     int             `json:"views_count"`
}

// ProductFeatures represents product characteristics
type ProductFeatures struct {
	Main       []Feature      `json:"main"`
	Screen     ScreenSpecs    `json:"screen,omitempty"`
	Dimensions DimensionSpecs `json:"dimensions,omitempty"`
}

// Feature represents a single product feature
type Feature struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

// ScreenSpecs for electronic devices
type ScreenSpecs struct {
	Size       string `json:"size"`
	Resolution string `json:"resolution"`
	Technology string `json:"technology"`
}

// DimensionSpecs for physical dimensions
type DimensionSpecs struct {
	Height string `json:"height"`
	Width  string `json:"width"`
	Depth  string `json:"depth"`
	Weight string `json:"weight"`
}

// Installments information
type Installments struct {
	Quantity int     `json:"quantity"`
	Amount   float64 `json:"amount"`
	Rate     float64 `json:"rate"`
	Currency string  `json:"currency"`
}

// ShippingInfo contains shipping details
type ShippingInfo struct {
	FreeShipping      bool   `json:"free_shipping"`
	LogisticType      string `json:"logistic_type"`
	EstimatedDelivery string `json:"estimated_delivery"`
}

// ProductWithDetails combines product with its details and seller
type ProductWithDetails struct {
	Product       Product       `json:"product"`
	ProductDetail ProductDetail `json:"product_detail"`
	Seller        Seller        `json:"seller"`
	Reviews       []Review      `json:"reviews,omitempty"`
	Questions     []Question    `json:"questions,omitempty"`
}
