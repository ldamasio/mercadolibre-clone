# Build stage
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend/src ./src
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./src/cmd/server

# Final stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/server .
COPY backend/data ./data
EXPOSE 8080
CMD ["./server"]
