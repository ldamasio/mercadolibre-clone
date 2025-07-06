// backend/src/pkg/utils/errors.go
package utils

import "errors"

// Common errors
var (
	ErrInvalidInput = errors.New("invalid input")
	ErrNotFound     = errors.New("resource not found")
	ErrInternal     = errors.New("internal server error")
)
