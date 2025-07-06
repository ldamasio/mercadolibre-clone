/ backend/src/internal/models/seller.go
package models

// Seller represents a marketplace seller
type Seller struct {
	ID             string           `json:"id"`
	Nickname       string           `json:"nickname"`
	Reputation     SellerReputation `json:"reputation"`
	Tags           []string         `json:"tags"`
	Location       Location         `json:"location"`
	ExperienceYears int             `json:"experience_years"`
	LeaderStatus   string           `json:"leader_status"`
}

// SellerReputation contains seller reputation metrics
type SellerReputation struct {
	Level        int                    `json:"level"`
	Status       string                 `json:"status"` // platinum, gold, silver
	Transactions TransactionMetrics     `json:"transactions"`
	Ratings      RatingMetrics          `json:"ratings"`
}

// TransactionMetrics for seller transactions
type TransactionMetrics struct {
	Completed int `json:"completed"`
	Canceled  int `json:"canceled"`
	Total     int `json:"total"`
}

// RatingMetrics for seller ratings
type RatingMetrics struct {
	Positive float64 `json:"positive"`
	Neutral  float64 `json:"neutral"`
	Negative float64 `json:"negative"`
}

// Location represents geographical location
type Location struct {
	City    string `json:"city"`
	State   string `json:"state"`
	Country string `json:"country"`
}
