// backend/src/internal/handlers/health_handler_test.go
package handlers

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealthHandler(t *testing.T) {
	handler := NewHealthHandler("1.0.0")

	req := httptest.NewRequest("GET", "/health", nil)
	w := httptest.NewRecorder()

	handler.Health(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200, got %d", w.Code)
	}

	var response HealthResponse
	json.NewDecoder(w.Body).Decode(&response)

	if response.Status != "healthy" {
		t.Errorf("Expected status 'healthy', got %s", response.Status)
	}

	if response.Version != "1.0.0" {
		t.Errorf("Expected version '1.0.0', got %s", response.Version)
	}
}
