// backend/src/internal/handlers/health_handler.go
package handlers

import (
	"net/http"

	"github.com/mercadolibre-clone/backend/src/pkg/utils"
)

// HealthResponse represents the health check response
type HealthResponse struct {
	Status  string `json:"status"`
	Version string `json:"version"`
}

// HealthHandler handles health check requests
type HealthHandler struct {
	version string
}

// NewHealthHandler creates a new health handler
func NewHealthHandler(version string) *HealthHandler {
	return &HealthHandler{version: version}
}

// Health handles GET /health
func (h *HealthHandler) Health(w http.ResponseWriter, r *http.Request) {
	response := HealthResponse{
		Status:  "healthy",
		Version: h.version,
	}

	utils.RespondWithJSON(w, http.StatusOK, response)
}
