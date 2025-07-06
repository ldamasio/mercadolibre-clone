// backend/src/internal/config/config.go
package config

import (
	"os"
)

// Config holds application configuration
type Config struct {
	Port     string
	DataPath string
	Version  string
}

// Load loads configuration from environment variables
func Load() *Config {
	return &Config{
		Port:     getEnv("PORT", "8080"),
		DataPath: getEnv("DATA_PATH", "./data"),
		Version:  getEnv("VERSION", "1.0.0"),
	}
}

// getEnv gets an environment variable with a default value
func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
