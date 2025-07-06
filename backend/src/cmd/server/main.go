// backend/src/cmd/server/main.go
package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/mercadolibre-clone/backend/src/internal/config"
	"github.com/mercadolibre-clone/backend/src/internal/handlers"
	"github.com/mercadolibre-clone/backend/src/internal/middleware"
	"github.com/mercadolibre-clone/backend/src/internal/repository"
)

func main() {
	// Load configuration
	cfg := config.Load()

	// Initialize repository
	repo := repository.NewProductRepository(cfg.DataPath)

	// Load data from JSON files
	if err := repo.LoadData(); err != nil {
		log.Fatalf("Failed to load data: %v", err)
	}
	log.Println("Data loaded successfully")

	// Initialize handlers
	productHandler := handlers.NewProductHandler(repo)
	healthHandler := handlers.NewHealthHandler(cfg.Version)

	// Setup routes
	mux := http.NewServeMux()

	// Health check
	mux.HandleFunc("GET /health", healthHandler.Health)
	mux.HandleFunc("GET /api/health", healthHandler.Health)

	// Product routes
	mux.HandleFunc("GET /api/products", productHandler.GetAllProducts)
	mux.HandleFunc("GET /api/products/{id}", productHandler.GetProductByID)
	mux.HandleFunc("GET /api/products/{id}/related", productHandler.GetRelatedProducts)
	mux.HandleFunc("GET /api/categories/{id}/products", productHandler.GetProductsByCategory)

	// Apply middleware
	handler := middleware.Logger(middleware.CORS(mux))

	// Create server
	srv := &http.Server{
		Addr:         ":" + cfg.Port,
		Handler:      handler,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start server in a goroutine
	go func() {
		log.Printf("Server starting on port %s", cfg.Port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server failed to start: %v", err)
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	// Graceful shutdown with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exited")
}
