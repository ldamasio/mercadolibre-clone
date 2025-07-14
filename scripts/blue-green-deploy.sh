#!/bin/bash
set -e

# Blue-Green Deployment Script for MercadoLibre Clone
# This script performs zero-downtime deployment using blue-green strategy

# Configuration
NAMESPACE="mercadolibre"
BACKEND_APP="backend"
FRONTEND_APP="frontend"
ISTIO_NAMESPACE="istio-system"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check kubectl
    if ! command -v kubectl &> /dev/null; then
        error "kubectl is not installed"
    fi
    
    # Check connection to cluster
    if ! kubectl cluster-info &> /dev/null; then
        error "Cannot connect to Kubernetes cluster"
    fi
    
    # Check namespace exists
    if ! kubectl get namespace $NAMESPACE &> /dev/null; then
        error "Namespace $NAMESPACE does not exist"
    fi
    
    success "All prerequisites met"
}

# Get current active version (blue or green)
get_active_version() {
    local app=$1
    local version=$(kubectl get service $app -n $NAMESPACE -o jsonpath='{.spec.selector.version}')
    echo $version
}

# Get inactive version
get_inactive_version() {
    local active=$1
    if [ "$active" == "blue" ]; then
        echo "green"
    else
        echo "blue"
    fi
}

# Scale deployment
scale_deployment() {
    local app=$1
    local version=$2
    local replicas=$3
    
    log "Scaling $app-$version to $replicas replicas..."
    kubectl scale deployment $app-$version -n $NAMESPACE --replicas=$replicas
    kubectl rollout status deployment/$app-$version -n $NAMESPACE --timeout=300s
}

# Update deployment image
update_deployment() {
    local app=$1
    local version=$2
    local image=$3
    
    log "Updating $app-$version with image $image..."
    kubectl set image deployment/$app-$version $app=$image -n $NAMESPACE
    kubectl rollout status deployment/$app-$version -n $NAMESPACE --timeout=300s
}

# Switch traffic to new version
switch_traffic() {
    local app=$1
    local new_version=$2
    
    log "Switching traffic for $app to $new_version..."
    
    # Update service selector
    kubectl patch service $app -n $NAMESPACE -p '{"spec":{"selector":{"version":"'$new_version'"}}}'
    
    # Update Istio VirtualService weights
    kubectl patch virtualservice $app-virtual-service -n $NAMESPACE --type='json' -p='[
        {"op": "replace", "path": "/spec/http/0/route/0/weight", "value": 0},
        {"op": "replace", "path": "/spec/http/0/route/1/weight", "value": 100}
    ]'
    
    sleep 5
}

# Health check
health_check() {
    local app=$1
    local endpoint=$2
    local max_attempts=30
    local attempt=0
    
    log "Performing health check for $app..."
    
    while [ $attempt -lt $max_attempts ]; do
        if curl -s -o /dev/null -w "%{http_code}" $endpoint | grep -q "200"; then
            success "Health check passed for $app"
            return 0
        fi
        
        attempt=$((attempt + 1))
        warning "Health check attempt $attempt/$max_attempts failed, retrying..."
        sleep 10
    done
    
    error "Health check failed for $app after $max_attempts attempts"
}

# Rollback deployment
rollback() {
    local app=$1
    local old_version=$2
    
    warning "Rolling back $app to $old_version..."
    
    # Switch traffic back
    kubectl patch service $app -n $NAMESPACE -p '{"spec":{"selector":{"version":"'$old_version'"}}}'
    
    # Scale down new version
    local new_version=$(get_inactive_version $old_version)
    scale_deployment $app $new_version 0
    
    success "Rollback completed for $app"
}

# Main deployment function
deploy_app() {
    local app=$1
    local new_image=$2
    local health_endpoint=$3
    
    log "Starting blue-green deployment for $app..."
    
    # Get current active version
    local active_version=$(get_active_version $app)
    local inactive_version=$(get_inactive_version $active_version)
    
    log "Current active version: $active_version"
    log "Will deploy to: $inactive_version"
    
    # Update inactive version with new image
    update_deployment $app $inactive_version $new_image
    
    # Scale up inactive version
    scale_deployment $app $inactive_version 3
    
    # Perform smoke test on inactive version
    log "Performing smoke test..."
    # You can add specific smoke test logic here
    
    # Switch traffic to new version
    switch_traffic $app $inactive_version
    
    # Health check
    if ! health_check $app $health_endpoint; then
        rollback $app $active_version
        error "Deployment failed, rolled back to $active_version"
    fi
    
    # Scale down old version
    log "Scaling down old version..."
    scale_deployment $app $active_version 0
    
    success "Blue-green deployment completed for $app"
}

# Main execution
main() {
    log "Starting blue-green deployment process..."
    
    # Check prerequisites
    check_prerequisites
    
    # Get latest images from environment or use defaults
    BACKEND_IMAGE=${BACKEND_IMAGE:-"ldamasio/mercadolibre-backend:latest"}
    FRONTEND_IMAGE=${FRONTEND_IMAGE:-"ldamasio/mercadolibre-frontend:latest"}
    
    # Deploy backend
    deploy_app $BACKEND_APP $BACKEND_IMAGE "https://backend.merli.leandrodamasio.com/health"
    
    # Deploy frontend
    deploy_app $FRONTEND_APP $FRONTEND_IMAGE "https://merli.leandrodamasio.com"
    
    success "All deployments completed successfully!"
}

# Run main function
main "$@"

