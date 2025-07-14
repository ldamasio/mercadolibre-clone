#!/bin/bash
# Script to create kubeconfig for different user roles

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    error "kubectl is not installed"
fi

# Variables
NAMESPACE="mercadolibre"
CLUSTER_NAME="mercadolibre-cluster"
SERVER=$(kubectl config view --minify -o jsonpath='{.clusters[0].cluster.server}')
CA_DATA=$(kubectl get secret -n kube-system -o jsonpath='{.items[?(@.metadata.annotations.kubernetes\.io/service-account\.name=="default")].data.ca\.crt}')

# Function to create service account and get token
create_sa_and_token() {
    local sa_name=$1
    local namespace=$2
    
    log "Creating ServiceAccount: $sa_name in namespace: $namespace"
    
    # Create ServiceAccount if it doesn't exist
    kubectl get sa $sa_name -n $namespace &>/dev/null || \
        kubectl create sa $sa_name -n $namespace
    
    # Create token for the ServiceAccount
    local secret_name="${sa_name}-token"
    
    # Create secret for token
    kubectl apply -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: $secret_name
  namespace: $namespace
  annotations:
    kubernetes.io/service-account.name: $sa_name
type: kubernetes.io/service-account-token
EOF
    
    # Wait for token to be generated
    sleep 2
    
    # Get the token
    local token=$(kubectl get secret $secret_name -n $namespace -o jsonpath='{.data.token}' | base64 --decode)
    echo $token
}

# Function to create kubeconfig
create_kubeconfig() {
    local user_type=$1
    local sa_name=$2
    local namespace=$3
    local output_file=$4
    
    log "Creating kubeconfig for $user_type"
    
    # Get token
    local token=$(create_sa_and_token $sa_name $namespace)
    
    # Create kubeconfig
    cat > $output_file <<EOF
apiVersion: v1
kind: Config
clusters:
- cluster:
    certificate-authority-data: $CA_DATA
    server: $SERVER
  name: $CLUSTER_NAME
contexts:
- context:
    cluster: $CLUSTER_NAME
    namespace: $namespace
    user: $sa_name
  name: ${CLUSTER_NAME}-${user_type}
current-context: ${CLUSTER_NAME}-${user_type}
users:
- name: $sa_name
  user:
    token: $token
EOF
    
    chmod 600 $output_file
    success "Kubeconfig created: $output_file"
}

# Main function
main() {
    local user_type=${1:-developer}
    local output_dir=${2:-.}
    
    case $user_type in
        "developer")
            create_kubeconfig "developer" "developer-sa" "$NAMESPACE" "$output_dir/kubeconfig-developer.yaml"
            log "Developer can:"
            log "  - View all resources in namespace $NAMESPACE"
            log "  - Port-forward to pods"
            log "  - View logs"
            log "  - Exec into pods for debugging"
            ;;
        "cicd")
            create_kubeconfig "cicd" "cicd-sa" "$NAMESPACE" "$output_dir/kubeconfig-cicd.yaml"
            log "CI/CD can:"
            log "  - Deploy applications"
            log "  - Update services"
            log "  - Manage ConfigMaps and Secrets"
            log "  - View pods and logs"
            ;;
        "monitoring")
            create_kubeconfig "monitoring" "monitoring-sa" "$NAMESPACE" "$output_dir/kubeconfig-monitoring.yaml"
            log "Monitoring can:"
            log "  - Read metrics across all namespaces"
            log "  - View all resources (read-only)"
            ;;
        "argocd")
            create_kubeconfig "argocd" "argocd-manager" "argocd" "$output_dir/kubeconfig-argocd.yaml"
            log "ArgoCD can:"
            log "  - Manage all resources in allowed namespaces"
            log "  - Sync applications"
            log "  - View logs"
            ;;
        *)
            error "Unknown user type: $user_type. Valid options: developer, cicd, monitoring, argocd"
            ;;
    esac
    
    log ""
    log "To use the kubeconfig:"
    log "  export KUBECONFIG=$output_dir/kubeconfig-$user_type.yaml"
    log "  kubectl get pods"
}

# Show usage if no arguments
if [ $# -eq 0 ]; then
    echo "Usage: $0 <user-type> [output-directory]"
    echo ""
    echo "User types:"
    echo "  developer   - Read access with debugging capabilities"
    echo "  cicd        - Deploy and manage applications"
    echo "  monitoring  - Read-only access to all resources"
    echo "  argocd      - Full access for GitOps"
    echo ""
    echo "Example:"
    echo "  $0 developer ./kubeconfigs"
    exit 1
fi

main "$@"
