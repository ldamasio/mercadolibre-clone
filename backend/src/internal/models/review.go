// backend/src/internal/models/review.go
package models

import "time"

// Review represents a product review
type Review struct {
	ID           string    `json:"id"`
	ProductID    string    `json:"product_id"`
	UserID       string    `json:"user_id"`
	Username     string    `json:"username"`
	Rating       int       `json:"rating"` // 1-5
	Comment      string    `json:"comment"`
	HelpfulCount int       `json:"helpful_count"`
	CreatedAt    time.Time `json:"created_at"`
}

// Question represents a product Q&A
type Question struct {
	ID         string    `json:"id"`
	ProductID  string    `json:"product_id"`
	Question   string    `json:"question"`
	Answer     string    `json:"answer,omitempty"`
	CreatedAt  time.Time `json:"created_at"`
	AnsweredAt time.Time `json:"answered_at,omitempty"`
}
